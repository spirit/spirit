import Transitions from './transitions'
import { EventEmitter } from 'events'
import { context } from '../utils'

/**
 * Timeline.
 */
class Timeline extends EventEmitter {

  type = 'dom'
  transformObject = null
  label = null
  transitions = null

  /**
   * Create new Timeline instance
   *
   * @param {string} type default = dom
   * @param {HTMLElement|Object} transformObject
   * @param {Array|Transitions} transitions
   * @param {string|null} label
   */
  constructor(type = 'dom', transformObject = null, transitions = new Transitions(), label = null) {
    super()
    this.setMaxListeners(Infinity)

    if (!(transitions instanceof Transitions)) {
      transitions = new Transitions(transitions)
    }

    Object.assign(this, {
      type,
      transformObject,
      transitions,
      label
    })

    if (type === 'dom') {
      if (!transformObject || context.isBrowser() && !(transformObject instanceof window.HTMLElement)) {
        throw new Error('HTMLElement is required.')
      }
    }
  }

  toObject() {
    let obj = {
      type: this.type,
      transformObject: this.transformObject,
      transitions: this.transitions.toArray(),
      label: this.label
    }

    Object.keys(obj).forEach(key => {
      if (!obj[key]) {
        delete obj[key]
      }
    })

    return obj
  }

}

export default Timeline
