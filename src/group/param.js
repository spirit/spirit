import { EventEmitter } from 'events'
import { is } from '../utils'
import { emitChange } from '../utils/emitter'

/**
 * Param
 * Containing property and value that can be changed over time
 *
 * @fires Param#change
 * @fires Param#change:prop
 * @fires Param#change:value
 * @fires List#change
 * @fires List#change:prop
 * @fires List#change:value
 */
class Param extends EventEmitter {

  _prop = null
  _value = null
  _list = null

  mappings = []

  /**
   * Create Param.
   * @param {string} prop
   * @param {*} value
   */
  constructor(prop, value) {
    super()

    this.setMaxListeners(Infinity)

    if (typeof prop === 'string' && value !== undefined) {
      Object.assign(this, {
        _prop: prop,
        _value: value
      })
    }
  }

  /**
   * Get current property
   *
   * @returns {string}
   */
  get prop() {
    return this._prop
  }

  /**
   * Set property
   *
   * @param {string} val
   * @fires Param#change
   * @fires Param#change:prop
   * @fires List#change
   * #fires List#change:prop
   */
  @emitChange()
  set prop(val) {
    if (typeof val !== 'string') {
      throw new Error('Property needs to be a string')
    }
    this._prop = val
  }

  /**
   * Get current value.
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

      return eval(val) // eslint-disable-line no-eval
    }

    return this._value
  }

  /**
   * Set current value
   *
   * @param {*} val
   * @fires Param#change
   * @fires Param#change:value
   * @fires List#change
   * @fires List#change:value
   */
  @emitChange()
  set value(val) {
    this._value = val
  }

  /**
   * Get the list where this param is attached to
   *
   * @returns {List}
   */
  get list() {
    return this._list
  }

  /**
   * Export param to a plain object
   *
   * @returns {object}
   */
  toObject() {
    return { [this.prop]: this.value }
  }

  /**
   * Check if this param is a CSS Transform
   *
   * @returns {boolean}
   */
  isCSSTransform() {
    return [
      'x', 'y', 'z',
      'rotateX', 'rotateY', 'rotateZ',
      'skewX', 'skewY',
      'scale', 'scaleX', 'scaleY'
    ].includes(this.prop)
  }

  /**
   * Check if current param has an evaluable value
   *
   * @returns {boolean}
   */
  isEval() {
    return /\{(.*?)}/.test(this._value)
  }
}

/**
 * Parse Param from object
 *
 * @param   {object} obj "{prop: value}"
 * @example {x: 120}
 * @returns {Param}
 */
Param.fromObject = function(obj) {
  if (!is.isObject(obj)) {
    throw new Error('Object is invalid.')
  }

  const keys = Object.keys(obj)

  if (keys.length === 0 || keys.length > 1) {
    throw new Error('Object is invalid')
  }

  const prop = keys[0]
  const value = obj[prop]

  if (value === null || value === undefined) {
    throw new Error('Object is invalid')
  }

  return new Param(prop, value)
}

Param.Events = [
  'change',
  'change:prop',
  'change:value'
]

export default Param
