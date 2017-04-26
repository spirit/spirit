import { gsap, debug, is } from '../utils'
import config from './config'

/**
 * Setup Spirit GSAP
 *
 * @param {object} conf
 */
export default async function setup(conf) {
  let timeline, tween

  if (is.isObject(conf)) {
    if (typeof conf.timeline === 'function' && typeof conf.tween === 'function') {
      timeline = conf.timeline
      tween = conf.tween
    }
  }

  if (!tween || !timeline) {
    return await gsap.ensure()
  }

  config.gsap.tween = tween
  config.gsap.timeline = timeline
}
