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
 *    @emitChange('album')
 *    @emitChange('label', 'untitled', [
 *      {
 *        validator: v => /\d+/.test(v),
 *        message: 'Not a number'
 *      },
 *      {
 *        validator = v => typeof v === 'string',
 *        message: 'Must be a string'
 *      }
 *    ])
 *
 *    class Song {
 *
 *    }
 */

import { Emitter } from './events';
import List from '../list/list';
import { isFunction } from './is';

/**
 * Setter deco
 *
 * @param   {Emitter}  target
 * @param   {string}   key
 * @param   {object}   descriptor
 * @returns {object}
 */
const setter = function(target, key, descriptor) {
  let fn = descriptor.set;

  if (
    !Emitter.prototype.isPrototypeOf(target) &&
    !Emitter.prototype.isPrototypeOf(target.prototype)
  ) {
    throw new Error('@emitter.emitChange can only be applied to event emitters');
  }

  return {
    ...descriptor,
    configurable: true,
    set(val) {
      const toObj = v => {
        return isFunction(this.toObject)
          ? this.toObject()
          : { [key]: v !== undefined ? v : val };
      };

      // get previous value
      let prev = this['_' + key];
      if (prev && typeof prev.toArray === 'function') {
        prev = prev.toArray();
      } else if (prev && typeof prev.toObject === 'function') {
        prev = prev.toObject();
      }

      let previous;

      if (prev !== val) {
        previous = toObj(prev);
      }

      // call class setter method
      fn.call(this, val);

      // is a duplicate on list?
      if (this._list instanceof List && this._list._duplicates !== true) {
        try {
          this._list.checkOnDuplicates();
        } catch (err) {
          fn.call(this, prev);
          throw err;
        }
      }

      // only emit changes
      if (prev === val) {
        return;
      }

      const from = prev && isFunction(prev.toObject) ? prev.toObject() : prev;

      const to = val && isFunction(val.toObject) ? val.toObject() : val;

      const changed = { type: key, from, to };

      let current;
      try {
        current = toObj();
      } catch (err) {
        current = { [key]: val };
      }

      const evtParams = { previous, current, changed };

      const evtChange = ['change', evtParams];
      const evtChangeProp = [`change:${key}`, evtParams, val];

      this.emit(...evtChange);
      this.emit(...evtChangeProp);

      if (this._list && this._list instanceof Emitter) {
        this._list.emit(...evtChange);
        this._list.emit(...evtChangeProp);
      }
    },
  };
};

/**
 * Decorator
 *
 * @param {string}  prop          (apply on classes)
 * @param {*}       defaultValue  (optional, default=null)
 * @param {Array}   validators    (optional)
 */
export function emitChange(prop = null, defaultValue = null, validators = []) {
  if (prop) {
    // bind as class
    return function(target) {
      // setup class prototype
      Object.defineProperties(target.prototype, {
        [`_${prop}`]: {
          value: defaultValue,
          writable: true,
          enumerable: false,
          configurable: true,
        },
        [prop]: {
          configurable: true,
          get() {
            return this[`_${prop}`];
          },
          set(val) {
            const errors = validators.reduce((res, v) => {
              if (!v.validator(val)) {
                res.push(v.message);
              }
              return res;
            }, []);

            if (errors.length > 0) {
              throw new Error(`${errors[0]}`);
            }

            this[`_${prop}`] = val;
          },
        },
      });

      // apply setter on it
      let descriptor = Object.getOwnPropertyDescriptor(target.prototype, prop);
      Object.defineProperty(target.prototype, prop, setter(target, prop, descriptor));
    };
  }

  // bind as setter
  return setter;
}
