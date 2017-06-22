import List from '../list/list'
import Group from './group'
import config from '../config/config'
import { debug } from '../utils'
import registry from '../registry/registry'

class Groups extends List {

  rootEl = null

  /**
   * Create a groups instance.
   *
   * @param {HTMLElement} rootEl define the animation root
   * @param {Array} data
   */
  constructor(rootEl = document.body, data = []) {
    super(data, Group, [{ name: 'untitled' }])

    if (!(rootEl instanceof window.Element)) {
      throw new Error('No root element provided.')
    }
    this.rootEl = rootEl

    // add groups to registry
    this.each(g => registry.add(g))
  }

  /**
   * Add group to list and global registry
   *
   * @param   {Array|*} group
   * @returns {Array|*}
   */
  add(group) {
    const affected = super.add(group)

    Array.isArray(affected)
      ? affected.forEach(g => registry.add(g))
      : registry.add(affected)

    return affected
  }

  /**
   * Remove group from list and global registry
   *
   * @param   {Array|*} group
   * @returns {Array|*}
   */
  remove(group) {
    const affected = super.remove(group)

    Array.isArray(affected)
      ? affected.forEach(g => registry.remove(g))
      : registry.remove(affected)

    return affected
  }

  /**
   * Construct all groups
   *
   * @returns {Array.<TimelineLite|TimelineMax>}
   */
  construct() {
    if (!config.gsap.timeline || !config.gsap.tween) {
      if (debug) {
        console.warn(`
            Trying to construct groups, but GSAP cannot be found.
            
            Did you forgot to call spirit.setup() ?
            
            spirit.setup() usage:
            
                // auto inject gsap from cdn:
                spirit.setup()
                
                // or provide gsap instances manually:
                spirit.setup({
                  tween:    TweenMax,
                  timeline: TimelineMax
                })
          `)
      }
      throw new Error('GSAP cannot be found')
    }
    return this.list.map(group => group.construct())
  }

  /**
   * Get group by name
   *
   * @param   {string} name
   * @returns {Group|undefined}
   */
  get(name) {
    return this.list.find(group => group.name === name)
  }

}

export default Groups
