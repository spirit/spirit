import config from '../config/config'
import { gsap, debug } from '../utils'
import Timelines from './timelines'
import { EventEmitter } from 'events'

/**
 * Group defaults
 *
 * @type {object}
 */
export const groupDefaults = {
  name: undefined,
  fps: 30,
  timelines: new Timelines()
}

/**
 * Group.
 */
class Group extends EventEmitter {

  _name = groupDefaults.name
  _fps = groupDefaults.fps
  _timelines = groupDefaults.timelines

  /**
   * Gsap timeline
   * @type {null|TimelineLite|TimelineMax}
   */
  timeline = null

  /**
   * Create a group instance.
   *
   * @param {object} props
   */
  constructor(props = {}) {
    super()
    this.setMaxListeners(Infinity)

    if (!props.name || typeof props.name !== 'string' || props.name.trim() === '') {
      throw new Error('Cannot create group without a name.')
    }

    Object.assign(this, { ...groupDefaults, ...props })
  }

  /**
   * Get timelines
   *
   * @returns {Timelines}
   */
  get timelines() {
    return this._timelines
  }

  /**
   * Set timelines
   *
   * @param {Timelines} timelines
   */
  set timelines(timelines) {
    if (!(timelines instanceof Timelines)) {
      timelines = new Timelines(Array.from(timelines))
    }
    this._timelines = timelines
  }

  /**
   * Get current fps
   *
   * @returns {number}
   */
  get fps() {
    return this._fps
  }

  /**
   * Set fps
   *
   * @param {number} fps
   */
  set fps(fps) {
    if (!(typeof fps === 'number' && isFinite(fps))) {
      throw new Error('Fps needs to be a number')
    }
    this._fps = fps

    if (this.timeline && this.timeline instanceof config.gsap.timeline) {
      this.timeline.timeScale(fps / 60)
    }
  }

  /**
   * Get name
   *
   * @returns {string}
   */
  get name() {
    return this._name
  }

  /**
   * Set name
   *
   * @param {string} name
   */
  set name(name) {
    if (typeof name !== 'string') {
      throw new Error('Name needs to be a string')
    }
    this._name = name
  }

  /**
   * Convert group to object
   *
   * @returns {object}
   */
  toObject() {
    const fps = this.fps
    const name = this.name
    const timelines = this.timelines.toArray()

    return {
      fps,
      name,
      timelines
    }
  }

  /**
   * Construct gsap timeline
   *
   * @returns {TimelineMax|TimelineLite}
   */
  construct() {
    try {

      if (!config.gsap.timeline || !config.gsap.tween) {
        if (debug) {
          console.warn(`
            Trying to construct group ${this.name}, but GSAP cannot be found.
            
            Did you forgot to call spirit.setup() ?
            
            spirit.setup() usage:
            
                // auto inject gsap from cdn:
                spirit.setup()
                
                // or provide gsap instances manually:
                spirit.setup({
                  tween:    TweenMax,
                  timeline: TimelineMax
                })
          `)
        }
        throw new Error('GSAP cannot be found')
      }

      // initiate an empty gsap timeline
      if (this.timeline && this.timeline instanceof config.gsap.timeline) {
        this.timeline.kill()
        this.timeline.clear()
      } else {
        this.timeline = new config.gsap.timeline({  // eslint-disable-line new-cap
          useFrames: true,
          paused: true
        })
        this.timeline.autoRemoveChildren = false
      }

      // create a valid gsap timeline out of timelines
      this.timelines.list.filter(tl => tl.type === 'dom').forEach(tl => {
        const el = tl.transformObject

        if (!(el instanceof window.Element)) {
          throw new Error('transformObject is not an Element')
        }

        // kill existing tweens
        config.gsap.tween.killTweensOf(el)
        delete el._gsTransform
        delete el._gsTweenID
        el.setAttribute('style', '')

        // stack timelines to group timeline
        this.timeline.add(gsap.generateTimeline(tl).play(), 0)
      })

      // update timescale based on fps
      this.timeline.timeScale(this.fps / 60)

    } catch (err) {
      throw new Error(`Could not construct timeline: ${err.message}`)
    }

    return this.timeline
  }

}

Group.fromObject = function(obj) {
  return new Group(obj)
}

export default Group
