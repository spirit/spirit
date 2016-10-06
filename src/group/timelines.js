import List from '../list/list'
import Timeline from './timeline'

class Timelines extends List {

  /**
   * Create timelines instance.
   * @param {Array} timelines
   */
  constructor(timelines = []) {
    super(timelines, Timeline, ['object', {}])
  }

  /**
   * Get timeline by transformObject
   * @param {HTMLElement|object} transformObject
   * @returns {Timeline}
   */
  get(transformObject) {
    return this._list.find(tl => tl.transformObject === transformObject)
  }

}

export default Timelines
