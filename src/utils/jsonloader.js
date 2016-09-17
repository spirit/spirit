import { isBrowser } from './context'

export let req = {}
export let cache = {}

/**
 * JSON Loader.
 * Optimize requests by caching results based on url.
 * @param {string} url
 * @returns {Promise}
 */
export default function(url) {

  // only run in browser
  if (!isBrowser()) {
    return Promise.reject(new Error('Invalid context. jsonLoader can only be used in browser.'))
  }

  // serve from cache
  if (url in cache) {
    return Promise.resolve(cache[url])
  }

  // serve from queued promise
  if (url in req) {
    return req[url]
  }

  // create promise request
  const promise = new Promise((resolve, reject) => {
    let xmlhttp = new XMLHttpRequest()

    xmlhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {

        try {

          let result = JSON.parse(this.responseText)

          cache[url] = result

          resolve(result)
          delete req[url]

        } catch (err) {
          reject(new Error(`jsonLoader: Invalid json for request ${url}`))
        }

      }
    }

    try {
      xmlhttp.open("GET", url, true)
      xmlhttp.send()
    } catch (err) {
      reject(new Error('Could not open request'))
    }

  })

  // store request
  if (!req[url]) {
    req[url] = promise
  }

  // send back the promise
  return promise
}
