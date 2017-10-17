class Config {

  debug = true

  gsap = {
    tween: null,
    timeline: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap/src/minified/TweenMax.min.js'
  }
}

export default new Config()
