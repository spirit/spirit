import { context, jsonloader, xpath, debug, is } from '../utils'
import { Groups, Group } from '../group'

/**
 * Get transform object from container
 *
 * @param   {HTMLElement} container
 * @param   {object}      tl
 * @returns {HTMLElement|object}
 */
function getTransformObject(container, tl) {
  let transformObject

  if (tl.type !== 'object') {
    if (tl.id) {
      transformObject = container.querySelector(`[data-spirit-id="${tl.id}"]`)

      if (!transformObject && !tl.path) {
        if (debug()) {
          console.group('Unable to resolve element by [data-spirit-id] attribute')
          console.warn('Timeline: ', tl)
          console.groupEnd()
        }
        throw new Error(`Cannot find element with [data-spirit-id="${tl.id}"]`)
      }
    }

    if (!transformObject && tl.path) {
      if (container === document.body) {
        container = undefined
      }
      transformObject = xpath.getElement(tl.path, container)

      if (!transformObject) {
        if (debug()) {
          console.group('Unable to resolve element by path expression')
          console.warn('Timeline: ', tl)
          console.groupEnd()
        }
        throw new Error(`Cannot find element with path expression ${tl.path}`)
      }
    }

    if (!transformObject) {
      if (debug()) {
        console.group('Unable to resolve element')
        console.warn('Timeline: ', tl)
        console.groupEnd()
      }
      throw new Error('Cannot find element.')
    }
  }

  return transformObject
}

/**
 * Get label for timeline to parse
 *
 * @param   {object} timeline
 * @returns {string}
 */
function getLabel(timeline) {
  if (typeof timeline.label === 'string' && timeline.label.trim().length > 0) {
    return timeline.label
  }

  if (timeline.id) {
    return timeline.id
  }

  if (timeline.path) {
    return timeline.path
  }

  return 'undefined'
}

/**
 * Get the id for a timeline based on transformObject and id
 *
 * @param {Element|object} transformObject
 * @param {object}         timeline
 */
function getId(transformObject, timeline) {
  if (timeline.id && transformObject.getAttribute('data-spirit-id') === timeline.id) {
    return timeline.id
  }

  if (timeline.type === 'dom' && transformObject.hasAttribute('data-spirit-id')) {
    return transformObject.getAttribute('data-spirit-id')
  }

  return null
}

/**
 * Parse groups
 *
 * @param   {object|Array}  data    animation data
 * @param   {HTMLElement}   element root element for animation groups
 * @returns Groups
 */
export function create(data, element = undefined) {
  if (!context.isBrowser()) {
    throw new Error('Invalid context. spirit.create() can only be executed in the browser.')
  }

  // ensure root element
  if (!(element instanceof window.Element)) {
    element = document.body || document.documentElement
  }

  if (is.isObject(data) && data['groups'] && Array.isArray(data['groups'])) {
    data = data['groups']
  }

  if (!Array.isArray(data)) {
    data = [data]
  }

  const groups = new Groups(element, [])

  data.forEach(g => {
    const d = {
      name: g.name,
      timeScale: g.timeScale || 1,
      timelines: [],
      unresolved: []
    }

    let timelines = g.timelines || []

    timelines.forEach(tl => {
      let transformObject

      try {
        transformObject = getTransformObject(element, tl)

        d.timelines.push({
          transformObject,
          type: tl.type,
          props: tl.props,
          label: getLabel(tl),
          path: xpath.getExpression(transformObject, element),
          id: getId(transformObject, tl)
        })
      } catch (error) {
        d.unresolved.push({ data: tl, error })
      }
    })

    const group = new Group(d)
    groups.add(group)
  })

  return groups
}

/**
 * Load data and apply it to element
 *
 * @param   {string}      url
 * @param   {HTMLElement} element
 * @returns {Promise}
 */
export function load(url, element = undefined) {
  if (!context.isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in the browser.'))
  }

  return jsonloader(url).then(data => create(data, element))
}
