import { context } from './utils';

const version = require('../package.json').version;

import config from './config/config';
import setup from './config/setup';
import groups from './registry/registry';
import { create, load } from './data/parser';
import loadAnimation from './loadAnimation';
import debug from './utils/debug';

export { config, version, setup, groups, create, load, loadAnimation };

const spirit = {
  config,
  version,
  setup,
  groups,
  create,
  load,
  loadAnimation,
};

export default spirit;

if (context.isBrowser()) {
  if (window !== undefined) {
    // add to global namespace so Spirit Studio can reach it
    window.spirit = spirit;
  }

  if (debug()) {
    console.warn(`You are running the development build of Spirit v${version}.`);
  }
}
