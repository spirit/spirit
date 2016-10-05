import List from '../list/list'
import Transition from './transition'

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
}

export default Transitions
