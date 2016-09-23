import { EventEmitter } from 'events'

class List extends EventEmitter {

  _list = []
  _model = null

  constructor(items, model = null) {
    super()
    this.setMaxListeners(Infinity)

    this._model = model

    // parse initial list
    if (Array.isArray(items)) {
      this._list = items.reduce((list, item) => {

        if (this._model) {
          if (item instanceof this._model) {
            list.push(item)
          } else {
            if (item instanceof Object && typeof model.fromObject === 'function') {
              list.push(model.fromObject(item))
            }else{
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
   * @param item
   */
  add(item) {
    const addSingle = (i) => {
      let newItem

      if (this._model) {
        if (i instanceof this._model) {
          newItem = i
        } else if (i instanceof Object && typeof this._model.fromObject === 'function') {
          newItem = this._model.fromObject(i)
        } else {
          throw new Error('Invalid item.')
        }
      }else{
        newItem = i
      }

      this._list.push(newItem)
      this.emit('add', newItem)
    }

    Array.isArray(item)
      ? item.forEach(addSingle)
      : addSingle(item)
  }


}

export default List
