import config from '../config/config'
import { gsap } from '../utils'
import Timelines from './timelines'
import { EventEmitter } from 'events'

/**
 * Group defaults
 * @type {object}
 */
export const groupDefaults = {
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
   * @type {null|config.gsap.timeline}
   */
  timeline = null

  /**
   * Create a group instance.
   * @param props
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
   * @returns {Timelines}
   */
  get timelines() {
    return this._timelines
  }

  /**
   * Set timelines
   * @param {Timelines} timelines
   */
  set timelines(timelines) {
    if (!(timelines instanceof Timelines)) {
      timelines = new Timelines(timelines)
    }
    this._timelines = timelines
  }

  /**
   * Get current fps
   * @returns {number}
   */
  get fps() {
    return this._fps
  }

  /**
   * Set fps
   * @param {number} fps
   */
  set fps(fps) {
    if (!(typeof fps === 'number' && isFinite(fps))) {
      throw new Error('Fps needs to be a number')
    }
    this._fps = fps
  }

  /**
   * Get name
   * @returns {string}
   */
  get name() {
    return this._name
  }

  /**
   * Set name
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
   * @returns {Promise}
   */
  construct() {
    return new Promise((resolve, reject) => {
      const doConstruct = () => {
        try {
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

            if (!(el instanceof window.HTMLElement)) {
              throw new Error('transformObject is not an HTMLElement')
            }

            // kill existing tweens
            config.gsap.tween.killTweensOf(el)
            delete el._gsTransform
            delete el._gsTweenID
            el.setAttribute('style', '')

            // stack timelines to group timeline
            this.timeline.add(gsap.generateTimeline(tl).play(), 0)
          })

          resolve(this.timeline)
        } catch (err) {
          reject(new Error(`Could not construct timeline: ${err.message}`))
        }
      }

      gsap.ensure()
        .then(doConstruct)
        .catch(reject)
    })
  }

}

Group.fromObject = function(obj) {
  return new Group(obj)
}

export default Group
