import config from '../config/config'
import loadScript from './loadscript'
import Timeline from '../group/timeline'
import debug from './debug'

/**
 * Check on gsap presence
 *
 * @returns {boolean}
 */
export function has() {
  return !!(config.gsap.tween && config.gsap.timeline)
}

/**
 * Ensure gsap is loaded
 * Auto inject gsap if configured
 *
 * @returns {Promise}
 */
export function ensure() {
  if (has()) {
    return Promise.resolve()
  }

  if (!config.gsap.autoInject) {
    if (debug) {
      console.warn(`
      
        It seems that you have disabled autoInject. GSAP can not be found by Spirit.
        Please make sure you provide the tween and timeline to Spirit.
      
        For example:
        
        spirit.setup({
          tween: TweenMax,
          timeline: TimelineMax
        })
        
        Or enable the autoInject "spirit.config.gsap.autoInject = true".
        
      `)
    }

    return Promise.reject(new Error('GSAP not found.'))
  }

  if (debug) {
    console.warn(`
      
      GSAP is being fetched from CDN: ${config.gsap.autoInjectUrl}.
      If you already have GSAP installed, please provide it to Spirit:
      
        spirit.setup({
          tween: TweenMax,
          timeline: TimelineMax
        })
      
      You want to use another cdn? Change it here:
       
        spirit.config.gsap.autoInjectUrl = 'https://cdn.xxx'
      
    `)
  }

  return loadScript(config.gsap.autoInjectUrl)
    .then(() => {
      config.gsap.tween = window.TweenMax
      config.gsap.timeline = window.TimelineMax

      return Promise.resolve()
    })
}

/**
 * Get previous frame for param on transition
 *
 * @param   {Transition}  transition
 * @param   {Param}       param
 * @returns {number}
 */
export function getPreviousFrame(transition, param) {
  let tr = transition
  let result

  while (tr && !result) {
    tr = tr._prev
    if (tr && tr.params.get(param.prop)) {
      result = tr
    }
  }
  return result ? result.frame : 0
}

/**
 * Generate timeline from data
 *
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

  const timeline = new config.gsap.timeline({ // eslint-disable-line new-cap
    useFrames: true,
    paused: true
  })

  tl.transitions.each(tr => {
    tr.params.each(param => {
      const start = getPreviousFrame(tr, param)
      const duration = tr.frame - start
      const params = { ...param.toObject(), ease: tr.ease }

      timeline.to(tl.transformObject, duration, params, start)
    })
  })

  return timeline
}
