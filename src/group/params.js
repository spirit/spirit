import List from '../list/list'
import Param from './param'

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

  constructor(params) {
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

}

export default Params
