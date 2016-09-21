import { EventEmitter } from 'events'
import Params from './params'

class Transition extends EventEmitter {

  frame = null
  params = null
  ease = null

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

}

export default Transition
