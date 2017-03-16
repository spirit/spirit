import config from './config/config'
import setup from './config/setup'
import { create, load } from './data/parser'
import groups from './registry/registry'
import { debug } from './utils'

const version = require('../package.json').version

import {
  Group,
  Groups,
  EvalMap,
  Param,
  Params,
  Timeline,
  Timelines,
  Transition,
  Transitions
} from './group'

export {
  version,
  config,
  setup,
  load,
  create,
  groups,
  Group,
  Groups,
  EvalMap,
  Param,
  Params,
  Timeline,
  Timelines,
  Transition,
  Transitions
}

function Spirit() {
  Object.assign(this, {
    version,
    config,
    setup,
    load,
    create,
    groups,
    Group,
    Groups,
    EvalMap,
    Param,
    Params,
    Timeline,
    Timelines,
    Transition,
    Transitions
  })
}

export default new Spirit()

if (debug) {
  console.warn('You are running the development build of Spirit.')
}
