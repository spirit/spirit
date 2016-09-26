import { EventEmitter } from 'events'

class Param extends EventEmitter {

  _prop = null
  _value = null
  _list = null

  mappings = []

  constructor(prop, value) {
    super()
    this.setMaxListeners(Infinity)

    Object.assign(this, { prop, value })
  }

  get prop() {
    return this._prop
  }

  set prop(val) {
    const prevModel = this.toObject()
    const from = this._prop
    const to = val

    this._prop = to
    this.emit('change:prop', to)

    if (this._list) {
      this._list.emit('change', { prevModel, model: this, from, to })
      this._list.emit('change:prop', { prevModel, model: this, from, to })
    }
  }

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

  set value(val) {
    const prevModel = this.toObject()
    const from = this._value
    const to = val

    this._value = to
    this.emit('change:value', to)

    if (this._list) {
      this._list.emit('change', { prevModel, model: this, from, to })
      this._list.emit('change:value', { prevModel, model: this, from, to })
    }
  }

  /**
   * Export param to a plain object
   * @returns {object}
   */
  toObject() {
    return { [this.prop]: this.value }
  }

  /**
   * Check if this param is a CSS Transform
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
   * @returns {boolean}
   */
  isEval() {
    return /\{(.*?)}/.test(this._value)
  }
}

/**
 * Parse Param from object
 * @param {object} obj "{prop: value}"
 * @example {x: 120}
 * @returns {Param}
 */
Param.fromObject = function(obj) {
  if (!obj || typeof obj !== 'object' || obj instanceof Array) {
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

export default Param
