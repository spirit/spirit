import List from '../list/list'
import Param from './param'
import { convert } from '../utils'

/**
 * List of params.
 * @fires Params#change:list
 * @fires Params#add
 * @fires Params#remove
 *
 * Bubble events from items
 * @fires Params#change
 * @fires Params#change:prop
 * @fires Params#change:value
 */
class Params extends List {

  duplicates = { prop: 'prop' }
  _mappings = []

  /**
   * Create params.
   * @param {Array|object} params
   */
  constructor(params = []) {
    if (Object.prototype.toString.call(params) === '[object Object]') {
      params = convert.objectToArray(params)
    }

    super(params, Param)
  }

  /**
   * Get mappings for these transitions
   * @returns {Array}
   */
  get mappings() {
    return this._mappings
  }

  /**
   * Set mappings for these transitions
   * @param {Array} mappings
   */
  set mappings(mappings) {
    this._mappings = mappings
    this.each(p => { p.mappings = [...mappings] })
  }

  /**
   * Get param by prop
   * @param {string} prop
   * @returns {Param}
   */
  get(prop) {
    return this._list.find(p => p.prop === prop)
  }

  /**
   * Contains param with prop
   * @param {string} prop
   * @returns {boolean}
   */
  haveProp(prop) {
    return this._list.filter(p => p.prop === prop).length > 0
  }

  /**
   * Add param
   * @param {*|Array} p
   * @returns {*}
   */
  add(p) {
    if (Object.prototype.toString.call(p) === '[object Object]' && !(p instanceof Param) && Object.keys(p).length > 1) {
      p = convert.objectToArray(p)
    }

    const affected = super.add(p)
    const exec = (param) => { param.mappings = [...this.mappings] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Remove param
   * @param {*|Array} p
   */
  remove(p) {
    const affected = super.remove(p)
    const exec = (param) => { param.mappings = [] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Convert params to an object
   * @returns {object}
   */
  toObject() {
    return this._list.reduce((obj, param) => ({ ...obj, ...param.toObject() }), {})
  }

}

Params.Events = [
  'change:list',
  'add',
  'remove',
  'change',
  'change:prop',
  'change:value'
]

export default Params
