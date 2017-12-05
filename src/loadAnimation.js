import setup from './config/setup'
import { create, load } from './data/parser'
import { isObject } from './utils/is'
import config from './config/config'
import registry from './registry/registry'

const defaults = {
  loop: false,
  autoPlay: true,
  yoyo: false,
  delay: 0,
  timeScale: false
}

/**
 * Create from data
 *
 * @param {object|Array} data
 * @param {Element}      container
 * @return {Promise<Array|object>}
 */
function createFromData(data, container) {
  if (data === undefined) {
    return Promise.resolve([])
  }

  if (!(isObject(data) || Array.isArray(data))) {
    return Promise.reject(new Error('Invalid animation data'))
  }
  return Promise.resolve(create(data, container))
}

/**
 * Load from path
 *
 * @param {string}  path
 * @param {Element} container
 * @return {Promise<Array|object>}
 */
function loadFromPath(path, container) {
  if (path && typeof path === 'string' && path.length > 0) {
    return load(path, container)
  }
  return Promise.resolve([])
}

/**
 * Load animation shorthand
 *
 * @param  {object} manifest
 * @return {Promise<Array|Function>}
 */
export default function(manifest) {
  const options = { ...defaults, ...manifest }
  const { animationData, container, path } = options

  if (options.loop === true) {
    options.loop = -1
  }

  return new Promise((resolve, reject) => {
    let result = []
    let add = coll => { result = [...result, ...(Array.isArray(coll) ? [...coll] : [coll])] }

    // setup gsap
    setup()
      .then(() => Promise.all([
        createFromData(animationData, container),
        loadFromPath(path, container)
      ]))
      .then(([created, loaded]) => {
        add(created)
        add(loaded)
      })
      .then(() => {
        // one animation group, return it's timeline directly
        if (result.length === 1 && result[0].length === 1) {
          return result[0][0].construct()
        }

        // multiple groups!
        let g = {}
        for (let groups of result) {
          for (let group of groups) {
            g[group.name] = group.construct()
            g[group.name].construct = function() {
              let tl = registry.get(group.name).construct()
              tl.construct = this.construct
              return tl
            }
          }
        }
        return g
      })
      .then(res => {
        let timelines = (res instanceof config.gsap.timeline) ? [res] : Object.keys(res).map(k => res[k])

        for (let timeline of timelines) {
          if (options.loop) {
            timeline.repeat(options.loop)
          }

          if (options.yoyo) {
            timeline.yoyo(true)
          }

          if (options.delay !== 0) {
            timeline.repeatDelay(options.delay)
          }

          if (options.timeScale) {
            timeline.timeScale(options.timeScale)
          }

          if (options.autoPlay) {
            timeline.play(0)
          }
        }

        // finally resolve res
        resolve(res)
      })
      .catch(reject)
  })
}
