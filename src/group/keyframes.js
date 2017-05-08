import List from '../list/list'
import Keyframe from './keyframe'
import { convert, is, events } from '../utils'

class Keyframes extends List {

  duplicates = { prop: 'time' }
  sortOn = 'time'
  linkedList = true

  _mappings = []

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
   * @param {*|Array} keyframe
   * @returns {*}
   */
  add(keyframe) {
    if (is.isObject(keyframe) && !(keyframe instanceof Keyframe) && Object.keys(keyframe).length > 1) {
      keyframe = convert.objectToArray(keyframe)
    }

    const affected = super.add(keyframe)
    const exec = (keyframe) => { keyframe.mappings = [...this.mappings] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Remove keyframe
   *
   * @param {Keyframe}
   * @returns {Keyframe}
   */
  remove(keyframe) {
    const affected = super.remove(keyframe)
    const exec = (keyframe) => { keyframe.mappings = [] }

    Array.isArray(affected)
      ? affected.forEach(exec)
      : exec(affected)

    return affected
  }

  /**
   * Get mappings for these keyframes
   *
   * @returns {Array}
   */
  get mappings() {
    return this._mappings
  }

  /**
   * Set mappings for these keyframes
   *
   * @param {Array} mappings
   */
  set mappings(mappings) {
    this._mappings = mappings
    this.each(keyframe => { keyframe.mappings = [...mappings] })
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
