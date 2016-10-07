import config from '../config/config'
import loadScript from './loadscript'
import Timeline from '../group/timeline'
import Params from '../group/params'

/**
 * Check on gsap presence
 * @returns {boolean}
 */
export function has() {
  return !!(config.gsap.tween && config.gsap.timeline)
}

/**
 * Ensure gsap is loaded
 * Auto inject gsap if configured
 * @returns {Promise}
 */
export function ensure() {
  if (has()) {
    return Promise.resolve()
  }

  if (!config.gsap.autoInject) {
    return Promise.reject(new Error('GSAP not found.'))
  }

  return loadScript(config.gsap.autoInjectUrl)
    .then(() => {
      config.gsap.tween = window.TweenMax
      config.gsap.timeline = window.TimelineMax

      return Promise.resolve()
    })
}

/**
 * Construct tween object from params
 * @param {Params|object} params
 * @returns {object}
 */
export function constructTweenParams(params) {
  if (!(params instanceof Params)) {
    params = new Params(params)
  }

  const table = {
    'rotateX': { prop: 'rotationX', value: '+={value}deg' },
    'rotateY': { prop: 'rotationY', value: '+={value}deg' },
    'rotateZ': { prop: 'rotationZ', value: '+={value}deg' },
    'skewX': { prop: 'skewX', value: '{value}deg' },
    'skewY': { prop: 'skewY', value: '{value}deg' }
  }

  let result = {}

  params.each(param => {
    table.hasOwnProperty(param.prop)
      ? result[table[param.prop].prop] = table[param.prop].value.replace('{value}', param.value)
      : result[param.prop] = param.value
  })

  return result
}

/**
 * Generate timeline from data
 * @param {Timeline} tl
 */
export function generateTimeline(tl) {
  if (!tl || !(tl instanceof Timeline)) {
    throw new Error('Need valid timeline data to generate GSAP timeline from')
  }

  if (!config.gsap.timeline) {
    throw new Error('GSAP not set. Please make sure GSAP is available.')
  }

  if (tl.type !== 'dom') {
    throw new Error('Timeline invalid. Needs a timeline with type of dom.')
  }

  const timeline = new config.gsap.timeline({
    frames: true,
    paused: true
  })

  tl.transitions.each(tr => {
    const frame = tr._prev ? tr.frame - tr._prev.frame : tr.frame
    const prevFrame = tr._prev ? tr._prev.frame : 0
    const params = { ...constructTweenParams(tr.params), ease: tr.ease }

    if (Object.keys(params).length > 0) {
      timeline.add(config.gsap.tween.to(tl.transformObject, frame, params).play(), prevFrame)
    }
  })

  return timeline
}
