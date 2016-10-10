import List from '../list/list'
import Group from './group'

class Groups extends List {

  rootEl = null

  /**
   * Create a groups instance.
   * @param {HTMLElement} rootEl define the animation root
   * @param {Array} data
   */
  constructor(rootEl = document.body, data = []) {
    super(data, Group, [{ name: 'untitled' }])

    if (!(rootEl instanceof window.HTMLElement)) {
      throw new Error('No root element provided.')
    }
    this.rootEl = rootEl
  }

  /**
   * Construct all groups
   * @returns {Promise}
   */
  construct() {
    return Promise.all(this.list.map(group => group.construct()))
  }

  /**
   * Get group by name
   * @param {string} name
   * @returns {Group|undefined}
   */
  get(name) {
    return this.list.find(group => group.name === name)
  }

}

export default Groups
