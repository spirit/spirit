import Transitions from './transitions'
import { context, convert } from '../utils'
import EvalMap from './evalmap'

/**
 * Timeline.
 */
class Timeline {

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

    this.transitions.mappings = [new EvalMap(/this/g, transformObject)]
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

  destroy() {
    this.transitions.each(tr => tr.destroy())
  }

}

Timeline.fromObject = function(obj) {
  if (!obj || typeof obj !== 'object' || obj instanceof Array) {
    throw new Error('Object is invalid.')
  }

  const keys = Object.keys(obj)

  if (!keys.includes('transformObject')) {
    throw new Error('Object is invalid')
  }

  let args = convert.objectToArray(obj).filter(arg => arg !== undefined)
  args = {
    type: 'dom',
    transitions: [],
    ...convert.arrayToObject(args)
  }

  return new Timeline(args.type, args.transformObject, args.transitions, args.label || undefined)
}

export default Timeline
