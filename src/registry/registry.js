import List from '../list/list'
import { Group } from '../group'
import { debug } from '../utils'
import config from '../config/config'

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

    const existingGroup = this.get(group.name)
    const warn = msg => debug() && console.warn(`registry.add() Group "${group.name}" ${msg}`)

    const addToRegistry = () => {
      if (existingGroup) {
        warn('overwrite group in registry')
        this.remove(existingGroup)
      }
      super.add(group)
    }

    if (config.overwriteAnimations) {
      return addToRegistry()
    }

    if (!existingGroup) {
      warn('added to registry and can be resolved by Spirit desktop app')
      return addToRegistry()
    }

    warn('skipped, already exists in registry')
  }

  /**
   * Remove group from registry
   *
   * @param   {Group} group
   * @returns {Group}
   */
  remove(group) {
    group.reset()
    return super.remove(group)
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
