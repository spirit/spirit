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
    if (debug()) {
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

  if (debug()) {
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
 * Generate timeline from data
 *
 * @param {Timeline} timeline
 * @returns {TimelineMax|TimelineLite}
 */
export function generateTimeline(timeline) {
  if (!timeline || !(timeline instanceof Timeline)) {
    throw new Error('Need valid timeline data to generate GSAP timeline from')
  }

  if (!config.gsap.timeline) {
    throw new Error('GSAP not set. Please make sure GSAP is available.')
  }

  if (timeline.type !== 'dom') {
    throw new Error('Timeline invalid. Needs a timeline with type of dom.')
  }

  const tl = new config.gsap.timeline({ paused: true }) // eslint-disable-line new-cap

  let transformOrigin = timeline.props.get('transformOrigin')

  timeline.props.each(prop => {
    if (prop.keyframes.length === 0 || prop.name === 'transformOrigin' || prop.name === 'svgOrigin') {
      return
    }

    let keyframe = prop.keyframes.at(0)

    while (keyframe) {
      const { value, ease, time } = keyframe
      const prev = keyframe.prev()

      const start = prev ? prev.time : 0
      const duration = prev ? time - prev.time : time

      let props = { ease: ease || 'Linear.easeNone' }
      let property = { [prop.name]: value }

      // parse dots into recursive object
      if (/\./.test(prop.name)) {
        let segments = prop.name.split('.')
        let last = segments.pop()
        let obj = {}
        let o = obj

        while (segments.length > 0) {
          let segment = segments.shift()

          obj[segment] = {}
          obj = obj[segment]
        }

        obj[last] = value
        property = o
      }

      props = { ...props, ...property }

      if (time === 0) {
        props.immediateRender = true
      }

      if (prop.isCSSTransform()) {
        // set transform origin to last known frame
        let _transformOrigin = '50% 50%'
        if (transformOrigin && transformOrigin.keyframes.list.length > 0) {
          const l = transformOrigin.keyframes.list
            .filter(k => time === 0 ? k.time <= time : k.time < time)
            .sort((a, b) => a.time < b.time)
          _transformOrigin = l.length > 0 && l[0].value || _transformOrigin
        }
        props.transformOrigin = _transformOrigin
      }

      tl.to(timeline.transformObject, duration, props, start)

      keyframe = keyframe.next()
    }
  })

  return tl
}

/**
 * Recursively kill timeline
 * Reset props on targets
 *
 * @param {TimelineMax|TimelineLite} gsapTimeline
 */
export function killTimeline(gsapTimeline) {
  if (gsapTimeline && gsapTimeline instanceof config.gsap.timeline) {
    const targets = gsapTimeline.getChildren()
    gsapTimeline.kill()

    for (let i = 0; i < targets.length; i++) {
      if (targets[i] && targets[i] instanceof config.gsap.timeline) {
        killTimeline(targets[i])
        continue
      }

      if (targets[i].target !== null) {
        config.gsap.tween.set(targets[i].target, { clearProps: 'all' })
      }
    }
    gsapTimeline.clear()
  }
}
