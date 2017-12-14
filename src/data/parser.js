import { context, jsonloader, is, resolver } from '../utils'
import { Groups, Group } from '../group'

/**
 * Create groups factory
 *
 * @return {{add: {function} add, groups: {array|Groups} groups}}
 */
function groupsFactory() {
  let list = []

  const getGroupsByRoot = function(root) {
    for (let i = 0; i < list.length; i++) {
      let groups = list[i]
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
        group.resolve()
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
 * @param   {Element}       root  the root element for animation groups
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
      groupRoot = resolver.resolveElement(root, g.root)
      if (!groupRoot) {
        groupRoot = root
      }
    }

    const d = { name: g.name, timeScale: g.timeScale || 1, timelines: [] }
    let timelines = g.timelines || []

    timelines.forEach(timeline => {
      d.timelines.push({
        type: timeline.type,
        props: timeline.props,
        label: timeline.label || timeline.id || timeline.path,
        path: timeline.path || null,
        id: timeline.id || null
      })
    })

    factory.add(groupRoot, new Group(d))
  })

  return factory.groups()
}

/**
 * Load data and apply it to element
 *
 * @param   {string}  url
 * @param   {Element} root
 * @returns {Promise}
 */
export function load(url, root = undefined) {
  if (!context.isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in the browser.'))
  }

  return jsonloader(url).then(data => create(data, root))
}
