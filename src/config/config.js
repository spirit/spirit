import { isBrowser } from '../utils/context'

class Config {

  debug = process.env.NODE_ENV === 'development' && isBrowser()
  overwriteAnimations = true

  gsap = {
    tween: null,
    timeline: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap/src/minified/TweenMax.min.js'
  }
}

export default new Config()
