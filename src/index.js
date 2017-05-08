import { debug, context } from './utils'

const version = require('../package.json').version

export config from './config/config'
export setup from './config/setup'
export groups from './registry/registry'
export { create, load } from './data/parser'
export { version }

if (debug) {
  console.warn('You are running the development build of Spirit.')
}
