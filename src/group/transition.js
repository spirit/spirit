import { EventEmitter } from 'events'
import Params from './params'

class Transition extends EventEmitter {

  _frame = null
  _params = null
  _ease = null

  constructor(frame, params = new Params(), ease = 'Linear.easeNone') {
    super()
    this.setMaxListeners(Infinity)

    if (frame === undefined || frame === null || isNaN(frame)) {
      throw new Error('Invalid frame')
    }

    Object.assign(this, {
      frame,
      params,
      ease
    })

  }

  get frame() {
    return this._frame
  }

  set frame(f) {
    this._frame = f
    this.emit('change:frame', f)
  }

  get ease() {
    return this._ease
  }

  set ease(e) {
    this._ease = e
    this.emit('change:ease', e)
  }

  get params() {
    return this._params
  }

  set params(p) {
    this._params = p
    this.emit('change:params', p)
  }

}

export default Transition
