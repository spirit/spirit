import { isBrowser } from './context'

/**
 * Load script into web page context
 * .
 * @param   {string} src script source
 * @returns {Promise}
 */
export default function loadScript(src) {
  if (!isBrowser()) {
    return Promise.reject(new Error(`Script can only be loaded in browser: ${src}`))
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = true

    s.onload = function() {
      document.body.removeChild(s)
      resolve()
    }

    s.onerror = function() {
      document.body.removeChild(s)
      reject(new Error(`Could not load script ${src}`))
    }

    document.body.appendChild(s)
  })
}
