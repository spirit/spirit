import Props from './props'
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
   * Properties for this timeline.
   *
   * @type {Props}
   */
  props = null

  /**
   * Create new Timeline instance
   *
   * @param {string}              type default = dom
   * @param {HTMLElement|object}  transformObject
   * @param {Array|Props|object}  props
   * @param {string|null}         path
   * @param {string|null}         id
   * @param {string|null}         label
   */
  constructor(type = 'dom', transformObject = null, props = new Props(), path = null, id = null, label = null) {
    if (!(props instanceof Props)) {
      props = new Props(props)
    }

    Object.assign(this, {
      type,
      transformObject,
      props,
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

    this.props.mappings = [new EvalMap(/this/g, transformObject)]
  }

  toObject() {
    let obj = {
      type: this.type,
      transformObject: this.transformObject,
      props: this.props.toObject(),
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
    if (this.props instanceof Props) {
      this.props.each(tr => tr.destroy())
    }
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
    props: {},
    ...convert.arrayToObject(args)
  }

  return new Timeline(
    args.type,
    args.transformObject,
    args.props,
    args.path || undefined,
    args.id || undefined,
    args.label || undefined
  )
}

export default Timeline
