import List from '../list/list'
import Prop from './prop'
import { convert, is, events } from '../utils'

class Props extends List {

  duplicates = { prop: 'name' }
  sortOn = (a, b) => b.name < a.name
  linkedList = true

  /**
   * Create properties
   *
   * @constructor
   * @param {Array|object} props
   */
  constructor(props = []) {
    if (is.isObject(props)) {
      props = convert.objectToArray(props)
    }
    super(props, Prop, ['prop'])
  }

  /**
   * Get property by name
   *
   * @param {string} name
   */
  get(name) {
    return this._list.find(p => p.name === name)
  }

  /**
   * Add properties
   *
   * @param {*|Array} k
   * @returns {*}
   */
  add(p) {
    if (is.isObject(p) && !(p instanceof Prop) && Object.keys(p).length > 1) {
      p = convert.objectToArray(p)
    }

    return super.add(p)
  }

  /**
   * Does have property with name?
   *
   * @param   {string} name
   * @returns {boolean}
   */
  haveProp(name) {
    return !!this.get(name)
  }

  /**
   * Convert properties to object
   *
   * @returns {object}
   */
  toObject() {
    return this.list.reduce((obj, prop) => ({ ...obj, ...prop.toObject() }), {})
  }

  /**
   * Destroy events
   */
  destroy() {
    this.each(prop => prop.destroy())
    events.clearEvents(this, Props.Events)
  }

}

Props.Events = [
  'change:list',
  'add',
  'remove',
  'change',
  'change:name',
  'change:keyframes',
  'change:keyframes:list',
  'change:keyframe',
  'change:keyframe:time',
  'change:keyframe:value',
  'change:keyframe:ease',
  'add:keyframe',
  'remove:keyframe'
]

export default Props
