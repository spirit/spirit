import { isBrowser } from '../utils/context'

class Config {
  debug = process.env.NODE_ENV === 'development' && isBrowser()
  overwriteAnimations = true

  gsap = {
    tween: null,
    timeline: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap@2.1.3/umd/TweenMax.js'
  }
}

export default new Config()
