import config from './config'

/**
 * Setup gsap tween and timeline
 *
 * @param {object} gsap {tween: Tween(Max/Lite), timeline: Timeline(Max/Lite)}
 */
export default function setup(gsap) {
  if (!(typeof gsap === 'object')) {
    throw new Error('Unable to setup gsap. Invalid type. Provide an object {tween, timeline}.')
  }

  if (!('tween' in gsap) || !('timeline' in gsap)) {
    throw new Error('Unable to setup gsap. Invalid object. Provide an object {tween, timeline}')
  }

  config.gsap.tween = gsap.tween
  config.gsap.timeline = gsap.timeline
}
