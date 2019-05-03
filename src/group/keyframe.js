import { is } from '../utils'
import { emitChange } from '../utils/emitter'
import { Emitter } from '../utils/events'

/**
 * -------------------------------------------
 * Single keyframe.
 *
 * @example
 *
 *    {
 *      "0.1s": { value: 10, ease: "Linear.easeNone" }
 *    }
 *
 * @fires Keyframe#change
 * @fires Keyframe#change:time
 * @fires Keyframe#change:value
 * @fires Keyframe#change:ease
 *
 * @fires List#change
 * @fires List#change:time
 * @fires List#change:value
 * @fires List#change:ease
 *
 * -------------------------------------------
 */

@emitChange('time', null, [{ validator: val => typeof val === 'number', message: 'Time must be a number' }])
@emitChange('ease', null)

class Keyframe extends Emitter {
  _list = null
  _value = null

  mappings = []

  /**
   * Keyframe.
   *
   * @param {number}  time    position (in seconds) on timeline
   * @param {*}       value   value assigned
   * @param {string}  ease    easing value (optional)
   */
  constructor(time, value, ease = null) {
    super()

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
   * Get the  value
   *
   * @returns {*}
   */
  get value() {
    if (this.isEval()) {
      // create available mappings for current value
      const mappings = this.mappings.reduce((result, mapping) => {
        if (mapping.regex.global) {
          mapping.regex.lastIndex = 0
        }

        if (mapping.regex.test(this._value)) {
          result[mapping.regex] = mapping
        }

        return result
      }, {})

      // apply mappings
      let val = this._value

      for (let mapping in mappings) {
        val = val.replace(mappings[mapping].regex, `mappings[${mapping}].map`)
      }

      let res

      try {
        res = eval(val) // eslint-disable-line no-eval
      } catch (err) {
        if (this.mappings.length > 0) {
          throw err
        }
      }

      return res
    }

    return this._value
  }

  /**
   * Set value
   *
   * @param {*} val
   */
  @emitChange()
  set value(val) {
    this._value = val
  }

  /**
   * Get the list where this keyframe is added to
   *
   * @returns {Keyframes|null}
   */
  get list() {
    return this._list
  }

  /**
   * Check if current keyframe has an evaluable value
   *
   * @returns {boolean}
   */
  isEval() {
    return /{(.*?)}/.test(this._value)
  }

  /**
   * Convert to readable object
   *
   * @param   {boolean} ignoreEval
   * @returns {object} { "0.2s": { value: 10, ease: "Linear.easeNone" }}
   */
  toObject(ignoreEval = false) {
    let value

    try {
      value = ignoreEval ? this._value : this.value
    } catch (err) {
      value = this._value
    }

    return {
      [`${this.time}s`]: { value, ease: this.ease }
    }
  }

  /**
   * Destroy events
   */
  destroy() {
    this.removeAllListeners()
  }
}

/**
 * Create keyframe instance from object
 *
 * @example { "0.2s": { value: 10, ease: "Linear.easeNone" }}
 * @param   {object} obj
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
  let { value, ease } = obj[time]

  if (!is.isObject(obj[time]) && (typeof obj[time] === 'string' || typeof obj[time] === 'number')) {
    value = obj[time]
    ease = null
  }

  time = parseFloat(time)

  if (isNaN(time)) {
    throw new Error('Object is invalid. Invalid time object { `1s`: ... }')
  }

  if (value === undefined || value === null) {
    throw new Error('Object is invalid. No value found: {value}')
  }

  return new Keyframe(time, value, ease)
}

Keyframe.Events = [
  'change',
  'change:time',
  'change:value',
  'change:ease'
]

export default Keyframe
