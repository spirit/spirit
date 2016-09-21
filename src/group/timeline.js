import Transitions from './transitions'
import { EventEmitter } from 'events'

class Timeline extends EventEmitter {

  el = null
  label = null
  timelines = null

  constructor(el, transitions = new Transitions(), label = null) {
    super()

    if (!el || window && !(el instanceof window.HTMLElement)) {
      throw new Error('HTMLElement is required.')
    }

    Object.assign(this, {
      el,
      label,
      transitions: transitions || new Transitions()
    })
  }




}

export default Timeline
