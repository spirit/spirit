import { gsap, is } from '../utils'
import config from './config'

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
