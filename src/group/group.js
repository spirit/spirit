import { gsap } from '../utils'
import Timelines from './timelines'
import { EventEmitter } from 'events'

export const groupDefaults = {
  fps: 30,
  name: 'untitled',
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
   * Create a group instance.
   * @param props
   */
  constructor(props = groupDefaults) {
    super()
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
   * @param {Array|Timelines} timelines
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
   * Construct gsap timeline animation
   * Translate timelines to valid gsap timeline
   */
  construct() {
    return new Promise((resolve, reject) => {
      const doConstruct = () => {
        // implement constructing timelines,
        // waiting for timelines to be implemented
        resolve()
      }

      gsap.ensure()
        .then(doConstruct)
        .catch(reject)
    })
  }

}

export default Group
