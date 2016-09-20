export default function(...args) {
  return (args.length === 1)
    ? boundClass(...args)
    : boundMethod(...args)
}

const ignoreMethods = ['constructor']

function boundClass(target) {
  let keys = Object.getOwnPropertyNames(target.prototype)
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(target.prototype))
  }

  keys.forEach(key => {
    if (ignoreMethods.includes(key)) {
      return
    }

    const descriptor = Object.getOwnPropertyDescriptor(target.prototype, key)

    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor))
    }
  })
  return target
}

function boundMethod(target, key, descriptor) {
  const fn = descriptor.value

  if (typeof fn !== 'function') {
    throw new Error(`@autobind decorator can only be applied to methods not: ${typeof fn}`)
  }

  return {
    configurable: true,
    get() {
      if (this === target.prototype || this.hasOwnProperty(key)) {
        return fn
      }

      const boundFn = fn.bind(this)
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      })
      return boundFn
    },
    set() {
      return fn
    }
  }
}
