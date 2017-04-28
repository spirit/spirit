import List from '../list/list'
import Keyframe from './keyframe'
import { convert, is } from '../utils'

class Keyframes extends List {

  duplicates = { prop: 'prop' }

  constructor(keyframes = []) {
    if (is.isObject(keyframes)) {
      keyframes = convert.objectToArray(keyframes)
    }

    super(keyframes, Keyframe)
  }

  /**
   * Get keyframe at time
   *
   * @param   {string} time
   * @returns {Keyframe}
   */
  get(time) {
    // get keyframe at time
    return null
  }

  /**
   * Convert keyframes to object
   *
   * @returns {object}
   */
  toObject() {
    return this.list.reduce((obj, keyframe) => ({ ...obj, ...keyframe.toObject() }), {})
  }
}

export default Keyframes
