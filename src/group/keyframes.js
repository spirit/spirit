import List from '../list/list'
import Keyframe from './keyframe'
import { convert, is, events } from '../utils'

class Keyframes extends List {

  duplicates = { prop: 'time' }
  sortOn = 'time'
  linkedList = true

  /**
   * Create keyframes
   *
   * @constructor
   * @param {Array|object} keyframes
   */
  constructor(keyframes = []) {
    if (is.isObject(keyframes)) {
      keyframes = convert.objectToArray(keyframes)
    }
    super(keyframes, Keyframe, [0, 0])
  }

  /**
   * Add keyframe
   *
   * @param {*|Array} k
   * @returns {*}
   */
  add(k) {
    if (is.isObject(k) && !(k instanceof Keyframe) && Object.keys(k).length > 1) {
      k = convert.objectToArray(k)
    }

    return super.add(k)
  }

  /**
   * Get keyframe at time
   *
   * @param   {string} time
   * @returns {Keyframe}
   */
  get(time) {
    const t = parseFloat(time)

    // get keyframe at time
    return this._list.find(p => p.time === t)
  }

  /**
   * Convert keyframes to object
   *
   * @returns {object}
   */
  toObject() {
    return this.list.reduce((obj, keyframe) => ({ ...obj, ...keyframe.toObject() }), {})
  }

  /**
   * Destroy events
   */
  destroy() {
    this.each(keyframe => keyframe.destroy())
    events.clearEvents(this, Keyframes.Events)
  }
}

Keyframes.Events = [
  'change:list',
  'add',
  'remove',
  'change',
  'change:time',
  'change:value',
  'change:ease'
]

export default Keyframes
