import config from './config/config'
import setup from './config/setup'
import { create, load } from './data/parser'
import groups from './registry/registry'
import { debug } from './utils'

const version = require('../package.json').version

export * from './group'
export {
  version,
  config,
  setup,
  create,
  load,
  groups
}

if (debug) {
  console.warn('You are running the development build of Spirit.')
}
