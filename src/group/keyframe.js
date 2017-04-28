import { EventEmitter } from 'events'
import { emitChange } from '../utils/emitter'

/**
 * Single keyframe.
 *
 * @example { time: "0.1s", value: 10, ease: "Linear.easeNone" }
 */

@emitChange('time', null, val => typeof val === 'string')
@emitChange('value')
@emitChange('ease')

class KeyFrame extends EventEmitter {

  constructor(time, value, ease) {
    super()
    this.setMaxListeners(Infinity)

    Object.assign(this, { time, value, ease })
  }

  toObject() {
    return {
      [this.time]: {
        value: this.value,
        ease: this.ease
      }
    }
  }
}

export default KeyFrame
