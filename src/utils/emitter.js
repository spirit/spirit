/**
 * -------------------------------------------
 * Decorator for emitting changes
 * -------------------------------------------
 *
 * @example on setter:
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
 *
 * @example on class:
 *
 *    @emitChange('label', 'untitled')
 *    @emitChange('album')
 *
 *    class Song {
 *
 *    }
 */

import { EventEmitter } from 'events'
import { isFunction } from './is'

/**
 * Setter deco
 *
 * @param   {EventEmitter}  target
 * @param   {string}        key
 * @param   {object}        descriptor
 * @returns {object}
 */
const setter = function(target, key, descriptor) {
  let fn = descriptor.set

  if (!(EventEmitter.prototype.isPrototypeOf(target)) && !EventEmitter.prototype.isPrototypeOf(target.prototype)) {
    throw new Error('@emitter.emitChange can only be applied to event emitters')
  }

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
      } else if (prev && typeof prev.toObject === 'function') {
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

/**
 * Decorator
 *
 * @param prop
 */
export function emitChange(prop, defaultValue = null, validator = () => true) {
  if (prop) {
    // bind as class
    return function(target) {
      // setup class prototype
      Object.defineProperties(target.prototype, {
        [`_${prop}`]: {
          value: defaultValue,
          writable: true,
          enumerable: false,
          configurable: true
        },
        [prop]: {
          configurable: true,
          get() {
            return this[`_${prop}`]
          },
          set(val) {
            if (!validator(val)) {
              throw new Error(`${prop} is invalid. ${val}:${typeof val}`)
            }
            this[`_${prop}`] = val
          }
        }
      })

      // apply setter on it
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, prop)
      Object.defineProperty(target.prototype, prop, setter(target, prop, descriptor))
    }
  }

  // bind as setter
  return setter
}
