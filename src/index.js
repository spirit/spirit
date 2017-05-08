import { debug, context } from './utils'

const version = require('../package.json').version

import config from './config/config'
import setup from './config/setup'
import groups from './registry/registry'
import { create, load } from './data/parser'

if (debug) {
  console.warn(`You are running the development build of Spirit v${version}.`)
}

const Spirit = function() {
  this.config = config
  this.version = version
  this.setup = setup
  this.groups = groups
  this.create = create
  this.load = load
}

export {
  config,
  version,
  setup,
  groups,
  create,
  load
}

const spirit = new Spirit()

module.exports = spirit

if (context.isBrowser() && !window.spirit) {
  window.spirit = spirit
}
