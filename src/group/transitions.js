import List from '../list/list'
import Transition from './transition'
import { events } from '../utils'

/**
 * List of transitions.
 *
 * @fires Transitions#change:list
 * @fires Transitions#add
 * @fires Transitions#remove
 *
 * Bubble events from items
 *
 * @fires Transitions#change
 * @fires Transitions#change:frame
 * @fires Transitions#change:params
 * @fires Transitions#change:ease
 *
 * @fires Transitions#change:param
 * @fires Transitions#change:param:prop
 * @fires Transitions#change:param:value
 *
 * @fires Transitions#add:param
 * @fires Transitions#remove:param
 */
class Transitions extends List {

  duplicates = { prop: 'frame' }
  sortOn = 'frame'
  linkedList = true

  _mappings = []

  /**
   * Create transitions
   * @param {Array} transitions
   */
  constructor(transitions) {
    super(transitions, Transition, [0])
  }

  /**
   * Get a transition by frame
   * @param {number} frame
   */
  get(frame) {
    return this._list.find(tr => tr.frame === frame)
  }

  /**
   * Does have a transition with frame
   * @param {number} frame
   * @returns {boolean}
   */
  haveFrame(frame) {
    return this._list.filter(tr => tr.frame === frame).length > 0
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
    this.each(tr => { tr.params.mappings = [...mappings] })
  }

  /**
   * Apply mappings to child transition
   * @param {*|Array} tr
   * @returns {*}
   */
  add(tr) {
    const affected = super.add(tr)
    const exec = (transition) => { transition.params.mappings = [...this.mappings] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Remove mappings from transition on removal
   * @param {*|Array} transition
   */
  remove(tr) {
    const affected = super.remove(tr)
    const exec = (transition) => { transition.params.mappings = [] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Clean up transitions
   */
  destroy() {
    this.each(tr => tr.destroy())
    events.clearEvents(this, Transitions.Events)
  }
}

Transitions.Events = [
  'change:list',
  'add',
  'remove',
  'change',
  'change:frame',
  'change:params',
  'change:ease',
  'change:param',
  'change:param:prop',
  'change:param:value',
  'add:param',
  'remove:param'
]

export default Transitions
