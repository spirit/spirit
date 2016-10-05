import { EventEmitter } from 'events'

/**
 * List
 *
 * @fires List#add
 * @fires List#remove
 * @fires List#change:list
 */
class List extends EventEmitter {

  _list = []
  _model = null
  _duplicates = true
  _sortOn = false
  _linkedList = false

  constructor(items = [], model = null, defaultModelArgs = undefined) {
    super()
    this.setMaxListeners(Infinity)

    this._model = model

    if (model) {
      const testProto = (defaultModelArgs !== undefined)
        ? new model(...defaultModelArgs) // eslint-disable-line new-cap
        : new model() // eslint-disable-line new-cap

      if (typeof testProto.toObject !== 'function') {
        throw new Error('Invalid Model prototype. model.toObject does not exist.')
      }
    }

    if (!Array.isArray(items)) {
      throw new Error('Items should be an array')
    }

    // parse initial list
    this._list = items.reduce((list, item) => {
      if (this._model) {
        if (item instanceof this._model) {
          item._list = this
          if (item.setupBubbleEvents && typeof item.setupBubbleEvents === 'function') {
            item.setupBubbleEvents()
          }
          list.push(item)
        } else {
          if (item instanceof Object && typeof model.fromObject === 'function') {
            const itemFromModel = model.fromObject(item)
            itemFromModel._list = this
            if (itemFromModel.setupBubbleEvents && typeof itemFromModel.setupBubbleEvents === 'function') {
              itemFromModel.setupBubbleEvents()
            }
            list.push(itemFromModel)
          } else {
            throw new Error('Could not parse item from model')
          }
        }
      } else {
        list.push(item)
      }
      return list
    }, [])
  }

  /**
   * Get list to allow duplicates
   * @returns {boolean|object}
   */
  get duplicates() {
    return this._duplicates
  }

  /**
   * Set list to allow duplicates
   * @param {boolean|object} dup
   * When dup is an object it can check on a property
   * @example { prop: 'id' }
   */
  set duplicates(dup) {
    this._duplicates = dup
    this.checkOnDuplicates()
  }

  /**
   * Check current list on duplicates
   */
  checkOnDuplicates() {
    const dup = this._duplicates
    let uniq = false

    // check based on boolean
    if (typeof dup === 'boolean' && dup === false) {
      uniq = this.list
        .map(item => ({ count: 1, item }))
        .reduce((a, b) => {
          a[b.item] = (a[b.item] || 0) + b.count
          return a
        }, {})
    }

    // check based on object property
    if (dup instanceof Object && dup.hasOwnProperty('prop')) {
      uniq = this.list
        .map(item => ({ count: 1, prop: item[dup.prop] }))
        .reduce((a, b) => {
          a[b.prop] = (a[b.prop] || 0) + b.count
          return a
        }, {})
    }

    if (uniq && Object.keys(uniq).filter(a => uniq[a] > 1).length > 0) {
      throw new Error('List has duplicates')
    }
  }

  /**
   * Get the sort type of this list
   * @returns {boolean|string}
   */
  get sortOn() {
    return this._sortOn
  }

  /**
   * Set the sort type of this list
   * @param {boolean|string} sortType
   */
  set sortOn(sortType) {
    this._sortOn = sortType
    this.sort()
  }

  /**
   * Sort list based on sort type
   */
  sort() {
    const so = this._sortOn

    // sort on primitives
    if (typeof so === 'boolean' && so === true) {
      this._list = this._list.sort()
    }

    // sort on property
    if (typeof so === 'string') {
      this._list = this._list.sort((a, b) => a[so] - b[so])
    }
  }

  /**
   * Is current list linked?
   * @returns {boolean}
   */
  get linkedList() {
    return this._linkedList
  }

  /**
   * Set current list as a linked list
   * @param {boolean} linked
   */
  set linkedList(linked) {
    this._linkedList = linked
    this.linkItems()
  }

  /**
   * Link items to each other as a linked list based on sortOn
   * if this list is setup as a linked list
   */
  linkItems() {
    if (this._linkedList) {
      for (let i = 0; i < this._list.length; i++) {
        if (this._list[i] instanceof Object) {
          this._list[i]._prev = (i > 0) ? this._list[i - 1] : null
          this._list[i]._next = (i < this._list.length - 1) ? this._list[i + 1] : null
        } else {
          throw new Error('Can not link primitives.')
        }
      }
    }
  }

  /**
   * Get the list
   * @returns {Array}
   */
  get list() {
    return this._list
  }

  /**
   * Reset the list
   * @param {Array} l
   * @fires List#change:list
   */
  set list(l) {
    if (!Array.isArray(l)) {
      throw new Error('List should be an array')
    }

    this._list = l

    if (this._linkedList) {
      this.linkItems()
    }

    /**
     * List event.
     *
     * @event List#change:list
     * @type {Array}
     */
    this.emit('change:list', l)
  }

  /**
   * Get the length of list
   * @returns {Number}
   */
  get length() {
    return this.list.length
  }

  /**
   * Get the value at index
   * @param {number} index
   * @returns {*}
   */
  at(index) {
    if (index >= this._list.length) {
      throw new Error(`Index exceeded. Requested ${index}, have length of ${this.length}`)
    }

    return this._list[index]
  }

  /**
   * Add item to list
   * @param {*|Array} item
   * @fires List#add
   * @returns {*}
   */
  add(item) {
    let result = null

    const addSingle = (i) => {
      let newItem

      if (this._model) {
        if (i instanceof this._model) {
          newItem = i
          newItem._list = this
          if (newItem.setupBubbleEvents && typeof newItem.setupBubbleEvents === 'function') {
            newItem.setupBubbleEvents()
          }
        } else if (i instanceof Object && typeof this._model.fromObject === 'function') {
          newItem = this._model.fromObject(i)
          newItem._list = this
          if (newItem.setupBubbleEvents && typeof newItem.setupBubbleEvents === 'function') {
            newItem.setupBubbleEvents()
          }
        } else {
          throw new Error('Invalid item.')
        }
      } else {
        newItem = i
      }

      Array.isArray(result)
        ? result.push(newItem)
        : result = newItem

      this._list.push(newItem)

      /**
       * List event.
       *
       * @event List#add
       * @type {*}
       */
      this.emit('add', newItem)
    }

    if (Array.isArray(item)) {
      result = []
      item.forEach(addSingle)
    } else {
      addSingle(item)
    }

    this.checkOnDuplicates()
    this.sort()
    this.linkItems()

    return result
  }

  /**
   * Remove item from list
   * @fires List#remove
   * @param {*|Array} item
   */
  remove(item) {
    let result = null

    const removeSingle = (i) => {
      const doRemove = (ins) => {
        let index = this._list.indexOf(ins)
        if (index > -1) {
          this._list.splice(index, 1)

          if (ins._list && ins._list instanceof List) {
            ins._list = null
          }

          if (ins instanceof Object) {
            if ('_prev' in ins) {
              delete ins._prev
            }

            if ('_next' in ins) {
              delete ins._next
            }
          }

          /**
           * List event.
           *
           * @event List#remove
           * @type {*}
           */
          this.emit('remove', ins)

          Array.isArray(result)
            ? result.push(ins)
            : result = ins
        }
      }

      if (this._model) {
        if (i instanceof this._model) {
          doRemove(i)
        }
      } else {
        doRemove(i)
      }
    }

    if (Array.isArray(item)) {
      result = []
      item.forEach(removeSingle)
    } else {
      removeSingle(item)
    }

    this.sort()
    this.linkItems()

    return result
  }

  /**
   * Clear the list
   */
  clear() {
    this.each(this.remove.bind(this))
  }

  /**
   * Walk over each item
   * @returns {*}
   */
  each(cb) {
    return [...this.list].forEach(cb)
  }

  /**
   * Get an object representation of this list
   * @returns {Array}
   */
  toArray() {
    const l = this._model
      ? this.list.map(item => item.toObject())
      : this.list

    return l.reduce((a, b) => {
      if (b instanceof Object) {
        const obj = { ...b }
        delete obj._prev
        delete obj._next
        delete obj._list

        a.push(obj)
      } else {
        a.push(b)
      }

      return a
    }, [])
  }

}

List.Events = [
  'change:list',
  'add',
  'remove'
]

export default List
