import Transitions from './transitions'
import { context, convert, is } from '../utils'
import EvalMap from './evalmap'

/**
 * Timeline.
 */
class Timeline {

  /**
   * Timeline type.
   * Can be "dom" or "object"
   *
   * @type {string}
   */
  type = 'dom'

  /**
   * Object to apply transforms on.
   * If type is "dom" it refers to a HTMLElement else a plain javascript object
   *
   * @type {HTMLElement|Object}
   */
  transformObject = null

  /**
   * Defined label representing this timeline node.
   *
   * @type {string|null}
   */
  label = null

  /**
   * XPath of element, normalized by group element.
   * Only relevant if type is "dom"
   *
   * @type {string|null}
   */
  path = null

  /**
   * Identifier to select element. Override the path for resolving transformObject.
   * By default the id is set on element attribute [data-spirit-id].
   *
   * @type {string|null}
   */
  id = null

  /**
   * Transitions for this timeline.
   *
   * @type {Transitions}
   */
  transitions = null

  /**
   * Create new Timeline instance
   *
   * @param {string} type default = dom
   * @param {HTMLElement|Object} transformObject
   * @param {Array|Transitions} transitions
   * @param {string|null} path
   * @param {string|null} id
   * @param {string|null} label
   */
  constructor(type = 'dom', transformObject = null, transitions = new Transitions(), path = null, id = null, label = null) {
    if (!(transitions instanceof Transitions)) {
      transitions = new Transitions(transitions)
    }

    Object.assign(this, {
      type,
      transformObject,
      transitions,
      label,
      path,
      id
    })

    if (type === 'dom') {
      if (!transformObject || context.isBrowser() && !(transformObject instanceof window.Element)) {
        throw new Error('transformObject needs to be an element.')
      }

      if (!id && !path) {
        throw new Error('path is not defined')
      }
    }

    if (type === 'object') {
      if (!transformObject) {
        throw new Error('transformObject needs to be an object')
      }
    }

    this.transitions.mappings = [new EvalMap(/this/g, transformObject)]
  }

  toObject() {
    let obj = {
      type: this.type,
      transformObject: this.transformObject,
      transitions: this.transitions.toArray(),
      label: this.label,
      path: this.path,
      id: this.id
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
  if (!is.isObject(obj)) {
    throw new Error('Object is invalid.')
  }

  const keys = Object.keys(obj)

  if (!keys.includes('transformObject')) {
    throw new Error('Object is invalid')
  }

  let args = convert.objectToArray(obj).filter(arg => arg !== undefined)
  args = {
    type: args.type || 'dom',
    transitions: [],
    ...convert.arrayToObject(args)
  }

  return new Timeline(
    args.type,
    args.transformObject,
    args.transitions,
    args.path || undefined,
    args.id || undefined,
    args.label || undefined
  )
}

export default Timeline
