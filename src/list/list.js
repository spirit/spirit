import { EventEmitter } from 'events'

class List extends EventEmitter {

  _list = []
  _model = null

  constructor(items, model = null) {
    super()
    this.setMaxListeners(Infinity)

    this._model = model

    if (model) {
      const testProto = new model() // eslint-disable-line new-cap

      if (typeof testProto.toObject !== 'function') {
        throw new Error('Invalid Model prototype. model.toObject does not exist.')
      }
    }

    // parse initial list
    if (Array.isArray(items)) {
      this._list = items.reduce((list, item) => {
        if (this._model) {
          if (item instanceof this._model) {
            item._list = this
            list.push(item)
          } else {
            if (item instanceof Object && typeof model.fromObject === 'function') {
              const itemFromModel = model.fromObject(item)
              itemFromModel._list = this
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
   */
  set list(l) {
    if (!Array.isArray(l)) {
      throw new Error('List should be an array')
    }

    this._list = l
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
        } else if (i instanceof Object && typeof this._model.fromObject === 'function') {
          newItem = this._model.fromObject(i)
          newItem._list = this
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
      this.emit('add', newItem)
    }

    if (Array.isArray(item)) {
      result = []
      item.forEach(addSingle)
    } else {
      addSingle(item)
    }

    return result
  }

  /**
   * Remove item from list
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
    return this._model
      ? this.list.map(item => item.toObject())
      : this.list
  }

}

export default List
