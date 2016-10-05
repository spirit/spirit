import { EventEmitter } from 'events'
import Params from './params'
import { events } from '../utils'


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
   * @returns {number}
   */
  get frame() {
    return this._frame
  }

  /**
   * Set frame
   * @param {number} f
   * @fires Transition#change:frame
   */
  set frame(f) {
    if (isNaN(f)) {
      throw new Error('Frame should be a number')
    }

    if (f === this._frame) {
      return
    }

    this._frame = f

    /**
     * Transition event.
     *
     * @event Transition#change:frame
     * @type {number}
     */
    this.emit('change:frame', f)
  }

  /**
   * Get ease
   * @returns {string|function}
   */
  get ease() {
    return this._ease
  }

  /**
   * Set ease
   * @param {string|function} e
   * @fires Transition#change:ease
   */
  set ease(e) {
    if (typeof e !== 'string' && typeof e !== 'function') {
      throw new Error('Ease should be a string or function')
    }

    if (e === this._ease) {
      return
    }

    this._ease = e

    /**
     * Transition event.
     *
     * @event Transition#change:ease
     * @type {string|function}
     */
    this.emit('change:ease', e)
  }

  /**
   * Get the params
   * @returns Params
   */
  get params() {
    return this._params
  }

  /**
   * Set params
   * @param {Params} p
   * @fires Transition#change:params
   */
  set params(p) {
    if (!(p instanceof Params)) {
      p = new Params(p)
    }

    this._params.removeAllListeners()
    this._params.clear()
    this._params = p

    this.setupBubbleEvents()

    /**
     * Transition event.
     *
     * @event Transition#change:params
     * @type {Params}
     */
    this.emit('change:params', p)

  setupBubbleEvents() {
    events.clearEvents(this._params, [
      'change',
      'change:prop',
      'change:value',
      'add',
      'remove'
    ])

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
    this._params.removeAllListeners()
    this.removeAllListeners()
  }
}

/**
 * Parse Transition from object
 * @param {object} obj {ease:string|function, frame:number, params:array|object}
 * @example {frame: 12, ease: 'Linear.easeNone', params: {x: 100, y: 309}}
 * @returns Transition
 */
Transition.fromObject = function(obj) {
  if (!obj || typeof obj !== 'object' || obj instanceof Array) {
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

export default Transition
