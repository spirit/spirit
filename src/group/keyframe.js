import { EventEmitter } from 'events'
import { is } from '../utils'
import { emitChange } from '../utils/emitter'

/**
 * Single keyframe.
 *
 * @example
 *
 *   { '0.1s': { value: 10, ease: 'Linear.easeNone' } }
 */

@emitChange('time', null, [
  {
    validator: val => typeof val === 'number',
    message: 'Time must be a number'
  }
])
@emitChange('value', null)
@emitChange('ease', null)

class Keyframe extends EventEmitter {

  /**
   * Keyframe.
   *
   * @param {string}  time    position (in seconds) on timeline
   * @param {*}       value   value assigned
   * @param {string}  ease    easing value (optional)
   */
  constructor(time, value, ease = null) {
    super()
    this.setMaxListeners(Infinity)

    ease = ease || null

    Object.assign(this, { time, value, ease })
  }

  /**
   * Get next keyframe (linked list)
   *
   * @returns {Keyframe|null}
   */
  next() {
    return this._next
  }

  /**
   * Get previous keyframe (linked list)
   *
   * @returns {Keyframe|null}
   */
  prev() {
    return this._prev
  }

  /**
   * Convert to readable object
   *
   * @returns {object} { "0.2s": { value: 10, ease: "Linear.easeNone" }}
   */
  toObject() {
    return {
      [`${this.time}s`]: {
        value: this.value,
        ease: this.ease
      }
    }
  }
}

/**
 * Create keyframe instance from object
 *
 * @param   {object} obj { "0.2s": { value: 10, ease: "Linear.easeNone" }}
 * @returns {Keyframe}
 */
Keyframe.fromObject = function(obj) {
  if (!is.isObject(obj)) {
    throw new Error('Object is invalid')
  }

  const keys = Object.keys(obj)

  if (keys.length === 0 || keys.length > 1) {
    throw new Error('Object is invalid')
  }

  let time = keys[0]
  const { value, ease } = obj[time]

  time = parseFloat(time)

  if (isNaN(time)) {
    throw new Error('Object is invalid. Invalid time object { `1s`: ... }')
  }

  if (value === undefined || value === null) {
    throw new Error('Object is invalid. No value found: {value}')
  }

  return new Keyframe(time, value, ease)
}

export default Keyframe
