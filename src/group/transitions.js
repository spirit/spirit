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
