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
 * Create groups factory
 *
 * @return {{add: {function} add, groups: {array|Groups} groups}}
 */
function groupsFactory() {
  let list = []

  const getGroupsByRoot = function(root) {
    for (let groups of list) {
      if (groups.rootEl === root) {
        return groups
      }
    }
    return null
  }

  return {
    add: function(root, group) {
      let groups = getGroupsByRoot(root)
      if (!groups) {
        groups = new Groups(root, [])
        list.push(groups)
      }
      if (group) {
        groups.add(group)
      }
    },
    groups: function() {
      return list.length === 1 ? list[0] : list
    }
  }
}

/**
 * Parse groups
 *
 * @param   {object|Array}  data  animation data
 * @param   {HTMLElement}   root  the root element for animation groups
 * @returns Groups
 */
export function create(data, root = undefined) {
  if (!context.isBrowser()) {
    throw new Error('Invalid context. spirit.create() can only be executed in the browser.')
  }

  let resolveRoot = false

  // ensure root element
  if (!(root instanceof window.Element)) {
    resolveRoot = true
    root = document.body || document.documentElement
  }

  if (is.isObject(data) && data['groups'] && Array.isArray(data['groups'])) {
    data = data['groups']
  }

  if (!Array.isArray(data)) {
    data = [data]
  }

  const factory = groupsFactory()

  if (data.length === 0) {
    factory.add(root, null)
  }

  data.forEach(g => {
    let groupRoot = root

    if (resolveRoot && g.root) {
      groupRoot = g.root.id
        ? root.querySelector(`[data-spirit-id=${g.root.id}]`)
        : xpath.getElement(g.root.path, root)

      if (!groupRoot) {
        groupRoot = root
      }
    }

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
        transformObject = getTransformObject(groupRoot, tl)

        d.timelines.push({
          transformObject,
          type: tl.type,
          props: tl.props,
          label: getLabel(tl),
          path: xpath.getExpression(transformObject, groupRoot),
          id: getId(transformObject, tl)
        })
      } catch (error) {
        d.unresolved.push({ data: tl, error })
      }
    })

    factory.add(groupRoot, new Group(d))
  })

  return factory.groups()
}

/**
 * Load data and apply it to element
 *
 * @param   {string}      url
 * @param   {HTMLElement} root
 * @returns {Promise}
 */
export function load(url, root = undefined) {
  if (!context.isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in the browser.'))
  }

  return jsonloader(url).then(data => create(data, root))
}
