import { EventEmitter } from 'events'
import Params from './params'

/**
 * Frame transition.
 * Containing frame, ease and params information.
 *
 * @fires Transition#change
 * @fires Transition@change:frame
 * @fires Transition@change:ease
 * @fires Transition@change:params
 * @fires Transition@change:param
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

    Object.assign(this, { frame, params, ease })
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
   */
  set frame(f) {
    if (isNaN(f)) {
      throw new Error('Frame should be a number')
    }

    if (f === this._frame) {
      return
    }

    this._frame = f
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
   */
  set ease(e) {
    if (typeof e !== 'string' && typeof e !== 'function') {
      throw new Error('Ease should be a string or function')
    }

    if (e === this._ease) {
      return
    }

    this._ease = e
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
   */
  set params(p) {
    if (!(p instanceof Params)) {
      p = new Params(p)
    }

    this._params.removeAllListeners()
    this._params.clear()
    this._params = p

    // bubble change
    this._params.on('change', function() {
      this.emit('change:param', ...arguments)
    }.bind(this))

    // bubble change prop
    this._params.on('change:prop', function(){
      this.emit('change:param:prop', ...arguments)
    }.bind(this))

    // bubble change value
    this._params.on('change:value', function(){
      this.emit('change:param:value', ...arguments)
    }.bind(this))

    this.emit('change:params', p)
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

export default Transition
