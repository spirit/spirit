import config from './config/config'
import setup from './config/setup'
import { create, load } from './data/parser'
import groups from './registry/registry'

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

