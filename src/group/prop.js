import Keyframes from './keyframes'
import { is, events } from '../utils'
import { emitChange } from '../utils/emitter'
import { Emitter } from '../utils/events'
import { includes } from '../utils/polyfill'

/**
 * -------------------------------------------
 * Single Property.
 *
 * @example
 *
 *    {
 *      x: {
 *        "0.1s": { value: 10,  ease: null },
 *        "0.2s": { value: 0,   ease: null },
 *        "0.3s": { value: 100, ease: "Power3.easeOut" },
 *      }
 *    }
 *
 * @fires Prop#change
 * @fires Prop#change:name
 * @fires Prop#change:keyframes
 * @fires Prop#change:keyframes:list
 * @fires Prop#change:keyframe
 * @fires Prop#change:keyframe:time
 * @fires Prop#change:keyframe:value
 * @fires Prop#change:keyframe:ease
 * @fires Prop#add:keyframe
 * @fires Prop#remove:keyframe
 *
 * -------------------------------------------
 */

@emitChange('name', null, [
  { validator: val => typeof val === 'string', message: 'Name must be a string' },
  { validator: val => !/^\d+\.?\d*?$/.test(val), message: 'Name must be a string' }
])

class Prop extends Emitter {

  _keyframes = null
  _list = null

  /**
   * Property.
   *
   * @param {string} name
   * @param {object|Keyframes|Array} keyframes
   */
  constructor(name, keyframes = new Keyframes()) {
    super()

    if (!(keyframes instanceof Keyframes)) {
      keyframes = new Keyframes(keyframes)
    }

    name = name || null

    Object.assign(this, { name, keyframes })
  }

  /**
   * Get next property (linked list)
   *
   * @returns {Prop|null}
   */
  next() {
    return this._next
  }

  /**
   * Get previous property (linked list)
   *
   * @returns {Prop|null}
   */
  prev() {
    return this._prev
  }

  /**
   * Get the list where this prop is added to
   *
   * @returns {Props|null}
   */
  get list() {
    return this._list
  }

  /**
   * Get keyframes
   *
   * @returns {Keyframes|object|Array}
   */
  get keyframes() {
    return this._keyframes
  }

  /**
   * Set keyframes
   *
   * @param {Keyframes|object|Array} kf
   */
  @emitChange()
  set keyframes(kf) {
    if (!(kf instanceof Keyframes)) {
      kf = new Keyframes(kf)
    }

    let mappings = []

    if (this._keyframes) {
      mappings = this._keyframes.mappings
      this._keyframes.removeAllListeners()
      this._keyframes.clear()
    }

    this._keyframes = kf
    this._keyframes.mappings = mappings

    this.setupBubbleEvents()
  }

  /**
   * Bubble events from keyframes
   */
  setupBubbleEvents() {
    if (this._keyframes instanceof Keyframes) {
      this._keyframes.removeAllListeners()

      const evt = (from, to) => {
        this._keyframes.on(from, events.bubbleEvent(to, this))
      }

      evt('change:list', 'change:keyframes:list')
      evt('change', 'change:keyframe')
      evt('change:time', 'change:keyframe:time')
      evt('change:value', 'change:keyframe:value')
      evt('change:ease', 'change:keyframe:ease')
      evt('add', 'add:keyframe')
      evt('remove', 'remove:keyframe')
    }
  }

  /**
   * Convert Prop to readable object
   *
   * @param   {boolean} ignoreEval
   * @example { x: { "10.5s": { value: 100, ease: "Power2.easeOut" } } }
   * @returns {object}
   */
  toObject(ignoreEval = false) {
    const keyframes = this.keyframes ? this.keyframes.toObject(ignoreEval) : {}
    return { [this.name]: keyframes }
  }

  /**
   * Determine if this property is a CSS transform
   *
   * @returns {boolean}
   */
  isCSSTransform() {
    return includes([
      'x', 'y', 'z',
      'rotation', 'rotationZ', 'rotationX', 'rotationY',
      'skewX', 'skewY',
      'scale', 'scaleX', 'scaleY'
    ], this.name)
  }

  /**
   * Destroy.
   * Clear events
   */
  destroy() {
    if (this._keyframes) {
      this._keyframes.destroy()
    }
    this.removeAllListeners()
  }
}

/**
 * Create a valid Prop from object
 *
 * @param   {object} obj
 * @returns {Prop}
 */
Prop.fromObject = function(obj) {
  if (!is.isObject(obj)) {
    throw new Error('Object is invalid')
  }

  const keys = Object.keys(obj)

  if (keys.length === 0) {
    throw new Error('Object is invalid')
  }

  for (let i in obj) {
    if (!is.isObject(obj[i])) {
      throw new Error('Object is invalid')
    }
  }

  const p = keys[0]
  return new Prop(p, obj[p])
}

/**
 * Prop Events
 *
 * @type {Array}
 */
Prop.Events = [
  'change',
  'change:name',
  'change:keyframes',
  'change:keyframes:list',
  'change:keyframe',
  'change:keyframe:time',
  'change:keyframe:value',
  'change:keyframe:ease',
  'add:keyframe',
  'remove:keyframe'
]

export default Prop
