import Props from './props'
import { context, convert, is } from '../utils'
import { emitChange } from '../utils/emitter'
import { Emitter } from '../utils/events'
import EvalMap from './evalmap'

/**
 * Timeline.
 */
class Timeline extends Emitter {
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
  _transformObject = null

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
    super()

    Object.assign(this, {
      type,
      props: (props instanceof Props) ? props : new Props(props),
      label,
      path,
      id
    })

    this.transformObject = transformObject
  }

  @emitChange()
  set transformObject(transformObject) {
    this._transformObject = transformObject
    this.validate()

    if (transformObject && this.props instanceof Props) {
      const thisMapper = this.props.mappings.find(mapping => String(mapping.regex) === '/this/g')

      thisMapper
        ? (thisMapper.map = transformObject)
        : this.props.mappings.push(new EvalMap(/this/g, transformObject))

      this.props.mappings = [...this.props.mappings]
    }

    if (this.type === 'dom' && transformObject instanceof window.Element) {
      this._style = transformObject.getAttribute('style')
    }
  }

  get transformObject() {
    return this._transformObject
  }

  validate() {
    if (
      this.type === 'dom' &&
      context.isBrowser() &&
      this.transformObject &&
      !(this.transformObject instanceof window.Element)
    ) {
      throw new Error('transformObject needs to be an element')
    }

    if (this.type === 'object' && this.transformObject && !is.isObject(this.transformObject)) {
      throw new Error('transformObject needs to be an object')
    }
  }

  toObject(ignoreEval = false) {
    let obj = {
      type: this.type,
      transformObject: this.transformObject,
      props: this.props.toObject(ignoreEval),
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
