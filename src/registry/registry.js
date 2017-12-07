import List from '../list/list'
import { Group } from '../group'
import { debug } from '../utils'
import { includes } from '../utils/polyfill'

class Registry extends List {

  constructor() {
    super([])
  }

  /**
   * Add unique group
   *
   * @param {Group} group
   */
  add(group) {
    if (!(group instanceof Group)) {
      throw new Error('Invalid group. Only Group instances allowed.')
    }

    if (!includes(this.groupNames(), group.name)) {
      if (debug()) {
        console.warn(`registry.add() Group "${group.name}" added to registry (spirit.groups) and can be resolved by Spirit app`)
      }
      super.add(group)
    } else {
      if (debug()) {
        console.warn(`registry.add() Group "${group.name}" already exist in registry. Skip registry (spirit.groups)`)
      }
    }
  }

  /**
   * Get group by name
   *
   * @param   {string} name
   * @returns {Group}
   */
  get(name) {
    return this.list.find(g => g.name === name)
  }

  /**
   * Get all group names from registry
   *
   * @returns {Array}
   */
  groupNames() {
    return this.list.map(g => g.name)
  }

}

export default new Registry()
