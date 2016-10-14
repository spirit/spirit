import config from './config/config'
import setup from './config/setup'
import { create, load } from './data/parser'
import groups from './registry/registry'
import { debug } from './utils'

const version = global.VERSION

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

if (debug) {
  console.warn('You are running the development build of Spirit.')
}
