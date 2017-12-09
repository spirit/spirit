import { gsap, is } from '../utils'
import config from './config'

/**
 * Setup Spirit GSAP
 *
 * @param {object} conf
 */
export default function setup(conf = {}) {
  return new Promise((resolve, reject) => {
    is.isObject(conf) && Object.keys(conf).forEach(k => {
      let obj = (config.gsap.hasOwnProperty(k) && is.isFunction(conf[k]))
        ? config.gsap
        : config

      obj[k] = conf[k]
    })

    gsap.ensure()
      .then(resolve)
      .catch(reject)
  })
}
