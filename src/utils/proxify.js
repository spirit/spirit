export function ArrayLike(targetClass, list) {
  if (!('Proxy' in window)) {
    return targetClass
  }

  return class extends targetClass {

    static get name() { return targetClass.name }

    constructor(...args) {
      super(...args)

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

    [Symbol.iterator]() {
      let index = -1
      let l = this[list]

      return {
        next: () => ({ value: l[++index], done: !(index in l) })
      }
    }
  }
}
