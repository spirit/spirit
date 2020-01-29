import { isBrowser } from '../utils/context'

class Config {
  debug = process.env.NODE_ENV === 'development' && isBrowser()
  overwriteAnimations = true

  gsap = {
    instance: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap@3.1.1/dist/gsap.min.js'
  }
}

export default new Config()
