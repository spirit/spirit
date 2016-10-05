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
   * @fires Transition#change
   * @fires Transition#change:frame
   * @fires List#change
   * @fires List#change:frame
   */
  set frame(f) {
    if (isNaN(f)) {
      throw new Error('Frame should be a number')
    }

    if (f === this._frame) {
      return
    }

    const evt = events.createEventObjectForModel(Transition, this.toObject(), 'frame', this._frame, f)
    this._frame = f

    /**
     * Transition event.
     *
     * @event Transition#change
     * @type {Array}
     */
    const evtChange = ['change', evt]

    /**
     * Transition event.
     *
     * @event Transition#change:frame
     * @type {Array}
     */
    const evtChangeFrame = ['change:frame', evt, f]

    this.emit(...evtChange)
    this.emit(...evtChangeFrame)

    if (this._list) {
      this._list.emit(...evtChange)
      this._list.emit(...evtChangeFrame)
    }
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

    const evt = events.createEventObjectForModel(Transition, this.toObject(), 'ease', this._ease, e)
    this._ease = e

    /**
     * Transition event.
     *
     * @event Transition#change
     * @type {Array}
     */
    const evtChange = ['change', evt]

    /**
     * Transition event.
     *
     * @event Transition#change:frame
     * @type {Array}
     */
    const evtChangeEase = ['change:ease', evt, e]

    this.emit(...evtChange)
    this.emit(...evtChangeEase)

    if (this._list) {
      this._list.emit(...evtChange)
      this._list.emit(...evtChangeEase)
    }
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

    const evt = events.createEventObjectForModel(
      Transition,
      this.toObject(),
      'params',
      this._params.toArray(),
      p.toArray()
    )

    events.clearEvents(this._params, Params.Events)

    this._params.clear()
    this._params = p

    this.setupBubbleEvents()

    /**
     * Transition event.
     *
     * @event Transition#change
     * @type {Array}
     */
    const evtChange = ['change', evt]

    /**
     * Transition event.
     *
     * @event Transition#change:params
     * @type {Array}
     */
    const evtChangeParams = ['change:params', evt, p]

    this.emit(...evtChange)
    this.emit(...evtChangeParams)

    if (this._list) {
      this._list.emit(...evtChange)
      this._list.emit(...evtChangeParams)
    }
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
