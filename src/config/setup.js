import { gsap, is } from '../utils'
import config from './config'
import debug from '../utils/debug'

const version = require('../../package.json').version

/**
 * Setup Spirit GSAP
 *
 * @param {object} conf
 */
export default function setup(conf) {
  return new Promise((resolve, reject) => {
    let timeline, tween

    if (is.isObject(conf)) {
      if (typeof conf.timeline === 'function' && typeof conf.tween === 'function') {
        timeline = conf.timeline
        tween = conf.tween
      }

      if (typeof conf.debug === 'boolean') {
        config.debug = conf.debug
      }
    }

    if (debug()) {
      console.warn(`You are running the development build of Spirit v${version}.`)
    }

    if (!tween || !timeline) {
      gsap.ensure()
        .then(resolve)
        .catch(reject)
    } else {
      config.gsap.tween = tween
      config.gsap.timeline = timeline
      resolve()
    }
  })
}
