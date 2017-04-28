import { EventEmitter } from 'events'
import Params from './params'
import { events, is } from '../utils'
import { emitChange } from '../utils/emitter'

/**
 * Frame transition.
 * Containing frame, ease and params information.
 *
 * @fires Transition#change
 * @fires Transition#change:frame
 * @fires Transition#change:ease
 * @fires Transition#change:params
 *
 * @fires Transition#change:param
 * @fires Transition#change:param:prop
 * @fires Transition#change:param:value
 *
 * @fires Transition#add:param
 * @fires Transition#remove:param
 */
class Transition extends EventEmitter {

  _frame = null
  _params = new Params()
  _ease = null
  _list = null

  /**
   * Create Transition.
   *
   * @param {number}              frame
   * @param {Array|Params|object} params
   * @param {string|function}     ease
   */
  constructor(frame, params = new Params(), ease = 'Linear.easeNone') {
    super()
    this.setMaxListeners(Infinity)

    if (frame === undefined || frame === null || isNaN(frame)) {
      throw new Error('Invalid frame')
    }

    if (!ease || (typeof ease !== 'string' && typeof ease !== 'function')) {
      throw new Error('Invalid ease')
    }

    if (!(params instanceof Params)) {
      params = new Params(params)
    }

    Object.assign(this, {
      _frame: frame,
      _params: params,
      _ease: ease
    })

    this.setupBubbleEvents()
  }

  /**
   * Get current frame
   *
   * @returns {number}
   */
  get frame() {
    return this._frame
  }

  /**
   * Set frame
   *
   * @param {number} f
   * @fires Transition#change
   * @fires Transition#change:frame
   * @fires List#change
   * @fires List#change:frame
   */
  @emitChange()
  set frame(f) {
    if (isNaN(f)) {
      throw new Error('Frame should be a number')
    }
    this._frame = f
  }

  /**
   * Get ease
   *
   * @returns {string|function}
   */
  get ease() {
    return this._ease
  }

  /**
   * Set ease
   *
   * @param {string|function} e
   * @fires Transition#change:ease
   */
  @emitChange()
  set ease(e) {
    if (typeof e !== 'string' && typeof e !== 'function') {
      throw new Error('Ease should be a string or function')
    }
    this._ease = e
  }

  /**
   * Get the params
   *
   * @returns {Params}
   */
  get params() {
    return this._params
  }

  /**
   * Set params
   *
   * @param {Params} p
   * @fires Transition#change:params
   */
  @emitChange()
  set params(p) {
    if (!(p instanceof Params)) {
      p = new Params(p)
    }

    const mappings = this.params.mappings
    events.clearEvents(this._params, Params.Events)

    this._params.clear()
    this._params = p
    this._params.mappings = mappings

    this.setupBubbleEvents()
  }

  setupBubbleEvents() {
    events.clearEvents(this._params, Params.Events)

    this._params.on('change', events.bubbleEvent('change:param', this))
    this._params.on('change:prop', events.bubbleEvent('change:param:prop', this))
    this._params.on('change:value', events.bubbleEvent('change:param:value', this))
    this._params.on('add', events.bubbleEvent('add:param', this))
    this._params.on('remove', events.bubbleEvent('remove:param', this))

    if (this._list) {
      this._params.on('change', events.bubbleEvent('change:param', this._list))
      this._params.on('change:prop', events.bubbleEvent('change:param:prop', this._list))
      this._params.on('change:value', events.bubbleEvent('change:param:value', this._list))
      this._params.on('add', events.bubbleEvent('add:param', this._list))
      this._params.on('remove', events.bubbleEvent('remove:param', this._list))
    }
  }

  /**
   * Convert this transition to object
   *
   * @returns {object}
   */
  toObject(paramsAsArray = false) {
    return {
      frame: this.frame,
      ease: this.ease,
      params: paramsAsArray ? this.params.toArray() : this.params.toObject()
    }
  }

  /**
   * Clean up this transition.
   * Removes all listeners
   */
  destroy() {
    events.clearEvents(this._params, Params.Events)
    events.clearEvents(this, Transition.Events)
  }
}

/**
 * Parse Transition from object
 *
 * @param   {object} obj {ease:string|function, frame:number, params:array|object}
 * @example {frame: 12, ease: 'Linear.easeNone', params: {x: 100, y: 309}}
 * @returns {Transition}
 */
Transition.fromObject = function(obj) {
  if (!is.isObject(obj)) {
    throw new Error('Object is invalid.')
  }

  const keys = Object.keys(obj)

  if (!keys.includes('frame')) {
    throw new Error('Object is invalid')
  }

  const frame = obj.frame
  const ease = obj.ease || undefined
  const params = obj.params || undefined
  const args = [frame, params, ease].filter(arg => arg !== undefined)

  return new Transition(...args)
}

Transition.Events = [
  'change',
  'change:frame',
  'change:ease',
  'change:params',
  'change:param',
  'change:param:prop',
  'change:param:value',
  'add:param',
  'remove:param'
]

export default Transition
