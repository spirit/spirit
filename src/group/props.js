import List from '../list/list'
import Prop from './prop'
import { convert, is } from '../utils'

class Props extends List {

  duplicates = { prop: 'name' }
  sortOn = (a, b) => b.name < a.name
  linkedList = true

  _mappings = []

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
   * Get mappings for these properties
   *
   * @returns {Array}
   */
  get mappings() {
    return this._mappings
  }

  /**
   * Set mappings for these properties
   *
   * @param {Array} mappings
   */
  set mappings(mappings) {
    this._mappings = mappings
    this.each(prop => { prop.keyframes.mappings = [...mappings] })
  }

  /**
   * Add properties
   *
   * @param {*|Array} k
   * @returns {*}
   */
  add(prop) {
    if (is.isObject(prop) && !(prop instanceof Prop) && Object.keys(prop).length > 1) {
      prop = convert.objectToArray(prop)
    }

    const affected = super.add(prop)
    const exec = (prop) => { prop.keyframes.mappings = [...this.mappings] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Remove property
   *
   * @param {Prop}
   * @returns {Prop}
   */
  remove(prop) {
    const affected = super.remove(prop)
    const exec = (prop) => { prop.keyframes.mappings = [] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
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
   * @param   {boolean} ignoreEval
   * @returns {object}
   */
  toObject(ignoreEval = false) {
    return this.list.reduce((obj, prop) => ({ ...obj, ...prop.toObject(ignoreEval) }), {})
  }

  /**
   * Destroy events
   */
  destroy() {
    this.each(prop => prop.destroy())
    this.removeAllListeners()
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
