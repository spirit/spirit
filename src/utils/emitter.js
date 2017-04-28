/**
 * -------------------------------------------
 * Decorator for emitting changes
 * -------------------------------------------
 *
 * @example
 *
 *    import { emitChange } from '../utils/emitter'
 *
 *    class Item {
 *
 *      _label = null
 *      _list = new List()
 *
 *      get label() {
 *        return this._label
 *      }
 *
 *      @emitChange()
 *      set label(val) {
 *        this._label = val
 *      }
 *
 *    }
 */

import { EventEmitter } from 'events'
import { isFunction } from './is'

export function emitChange() {
  return function(target, key, descriptor) {
    if (!(target instanceof EventEmitter)) {
      throw new Error('@emitter.emitChange can only be applied to event emitters')
    }

    let fn = descriptor.set

    return {
      ...descriptor,
      configurable: true,
      set(val) {
        const toObj = v => {
          return isFunction(this.toObject)
            ? this.toObject()
            : { [key]: v !== undefined ? v : val }
        }

        // get previous value
        let prev = this['_' + key]
        if (prev && typeof prev.toArray === 'function') {
          prev = prev.toArray()
        }
        else if (prev && typeof prev.toObject === 'function') {
          prev = prev.toObject()
        }

        let previous

        if (prev !== val) {
          previous = toObj(prev)
        }

        // call class setter method
        fn.call(this, val)

        // only emit changes
        if (prev === val) {
          return
        }

        const changed = { type: key, from: prev, to: val }

        let current
        try {
          current = toObj()
        } catch (err) {
          current = { [key]: val }
        }

        const evtParams = { previous, current, changed }

        const evtChange = ['change', evtParams]
        const evtChangeProp = [`change:${key}`, evtParams, val]

        this.emit(...evtChange)
        this.emit(...evtChangeProp)

        if (this._list && this._list instanceof EventEmitter) {
          this._list.emit(...evtChange)
          this._list.emit(...evtChangeProp)
        }
      }
    }
  }
}
