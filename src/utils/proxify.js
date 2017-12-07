import { isBrowser } from './context'

export function ArrayLike(targetClass, list) {
  return class extends targetClass {

    static get name() { return targetClass.name }

    constructor(...args) {
      super(...args)

      if (isBrowser() && !('Proxy' in window)) {
        return this
      }

      this[Symbol.iterator] = function() {
        let index = -1
        let l = this[list]

        return {
          next: () => ({ value: l[++index], done: !(index in l) })
        }
      }

      return new Proxy(this, {
        get: (target, key, receiver) => {
          let isIndex = false

          try {
            isIndex = Number.isInteger(parseInt(key))
          } catch (err) {}

          if (isIndex) {
            return this[list][key]
          }

          if (key === Symbol.iterator) {
            return this[Symbol.iterator]
          } else {
            return Reflect.get(this, key, receiver)
          }
        }
      })
    }
  }
}
