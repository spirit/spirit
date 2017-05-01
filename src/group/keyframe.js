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
    validator: val => typeof val === 'string',
    message: 'Time must be a string'
  },
  {
    validator: val => /^(?:\d+|\d+(?::|\.)\d+)(?:s|ms)$/.test(val),
    message: 'Time signature invalid'
  }
])
@emitChange('value', null)
@emitChange('ease', null)

class Keyframe extends EventEmitter {

  /**
   * Keyframe.
   *
   * @param {string}  time    position on timeline
   * @param {*}       value   value assigned
   * @param {string}  ease    easing value (optional)
   */
  constructor(time, value, ease) {
    super()
    this.setMaxListeners(Infinity)

    ease = ease || null

    Object.assign(this, { time, value, ease })
  }

  /**
   * Convert to readable object
   *
   * @returns {object}
   */
  toObject() {
    return {
      [this.time]: {
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

  const time = keys[0]
  const { value, ease } = obj[time]

  if (value === undefined) {
    throw new Error('Object is invalid')
  }

  return new Keyframe(time, value, ease)
}

export default Keyframe
