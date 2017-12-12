import { context } from './utils'

const version = require('../package.json').version

import config from './config/config'
import setup from './config/setup'
import groups from './registry/registry'
import { create, load } from './data/parser'
import loadAnimation from './loadAnimation'
import debug from './utils/debug'

const Spirit = function() {}

Spirit.prototype = {
  config,
  version,
  setup,
  groups,
  create,
  load,
  loadAnimation
}

export {
  config,
  version,
  setup,
  groups,
  create,
  load,
  loadAnimation
}

const spirit = new Spirit()

module.exports = spirit

if (context.isBrowser() && !window.spirit) {
  window.spirit = spirit

  if (debug()) {
    console.warn(`You are running the development build of Spirit v${version}.`)
  }
}
