import List from '../list/list';
import { Group } from '../group';

class Registry extends List {
  constructor() {
    super([]);
  }

  /**
   * Add unique group
   *
   * @param {Group} group
   */
  add(group) {
    if (!(group instanceof Group)) {
      throw new Error('Invalid group. Only Group instances allowed.');
    }
    super.add(group);
  }

  /**
   * Remove group from registry
   *
   * @param   {Group} group
   * @returns {Group}
   */
  remove(group) {
    group.reset();
    return super.remove(group);
  }

  /**
   * Get group by name
   *
   * @param   {string} name
   * @returns {Group}
   */
  get(name) {
    return this.list.find(g => g.name === name);
  }

  /**
   * Get all group names from registry
   *
   * @returns {Array}
   */
  groupNames() {
    return this.list.map(g => g.name);
  }
}

export default new Registry();
