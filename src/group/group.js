import { autobind, gsap } from '../utils'
import Timelines from './timelines'
import { EventEmitter } from 'events'

/**
 * -------------------------------------------
 * Group defaults
 * -------------------------------------------
 */

export const groupDefaults = {
  fps: 30,
  name: 'untitled',
  timelines: new Timelines()
}

/**
 * -------------------------------------------
 * Group
 * -------------------------------------------
 */

@autobind
class Group extends EventEmitter {

  constructor(props = groupDefaults) {
    super()
    Object.assign(this, props)
  }

  /**
   * Construct gsap timeline animation
   * Translate timelines to valid gsap timeline
   */
  construct() {
    return new Promise((resolve, reject) => {

      const doConstruct = () => {

        // implement constructing timelines,
        // waiting for timelines to be implemented

        resolve()
      }

      gsap.ensure()
        .then(doConstruct)
        .catch(reject)
    })
  }

}

export default Group
