import List from '../list/list'
import Param from './param'

/**
 * Parse object to array
 * @param {object} obj
 * @returns {Array}
 */
function objectToArray(obj) {
  return Object.keys(obj).reduce((a, b) => {
    a.push({ [b]: obj[b] })
    return a
  }, [])
}

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

  /**
   * Create params.
   * @param {Array|object} params
   */
  constructor(params = []) {
    if (!Array.isArray(params) && params instanceof Object) {
      params = objectToArray(params)
    }

    super(params, Param)
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
    if (p instanceof Object && !(p instanceof Param) && !Array.isArray(p) && Object.keys(p).length > 1) {
      p = objectToArray(p)
    }

    const affected = super.add(p)

    return affected
  }
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
