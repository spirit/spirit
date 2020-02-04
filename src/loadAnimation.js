import setup from './config/setup';
import { create, load } from './data/parser';
import { isObject } from './utils/is';
import registry from './registry/registry';

const defaults = {
  loop: false,
  autoPlay: true,
  yoyo: false,
  delay: 0,
  timeScale: false,
};

/**
 * Create from data
 *
 * @param {object|Array} data
 * @param {Element}      container
 * @return {Promise<Array|object>}
 */
function createFromData(data, container) {
  if (data === undefined) {
    return Promise.resolve([]);
  }

  if (!(isObject(data) || Array.isArray(data))) {
    return Promise.reject(new Error('Invalid animation data'));
  }

  return Promise.resolve(create(data, container));
}

/**
 * Load from path
 *
 * @param {string}  path
 * @param {Element} container
 * @return {Promise<Array|object>}
 */
function loadFromPath(path, container) {
  if (path && typeof path === 'string' && path.length > 0) return load(path, container);
  return Promise.resolve([]);
}

/**
 * Load animation shorthand
 *
 * @param  {object} manifest
 * @return {Promise<Array|Function>}
 */
export default function(manifest) {
  const options = { ...defaults, ...manifest };
  const { animationData, container, path } = options;

  if (options.loop === true) {
    options.loop = -1;
  }

  return new Promise((resolve, reject) => {
    setup()
      .then(() =>
        Promise.all([
          createFromData(animationData, container),
          loadFromPath(path, container),
        ])
      )
      .then(([created, loaded]) => {
        const result = [];

        function add(item) {
          if (Array.isArray(item)) result.push(...item);
          else result.push(item);
        }

        add(created);
        add(loaded);

        return result;
      })
      .then(result => {
        let timelines = [];
        const g = {};

        if (result.length === 1 && result[0].length === 1) {
          // single group
          timelines.push(result[0].at(0).construct());
        } else {
          // multi group

          result.forEach(groups => {
            groups.each(group => {
              g[group.name] = group.construct();
              g[group.name].construct = function() {
                let tl = registry.get(group.name).construct();
                tl.construct = this.construct;
                return tl;
              };
            });
          });

          timelines.push(...Object.keys(g).map(k => g[k]));
        }

        // apply options
        for (let i = 0; i < timelines.length; i++) {
          let timeline = timelines[i];

          if (options.loop) {
            const loopCount = typeof options.loop === 'boolean' ? -1 : options.loop;
            timeline.repeat(loopCount);
          }

          if (options.yoyo) {
            timeline.yoyo(true);
          }

          if (options.delay !== 0) {
            timeline.repeatDelay(options.delay);
          }

          if (options.timeScale) {
            timeline.timeScale(options.timeScale);
          }

          if (options.autoPlay) {
            timeline.play(0);
          }
        }

        if (timelines.length === 1) {
          // remove promise behaviour
          // else it can only be resolved when animation has completed
          timelines[0].then = undefined;

          resolve(timelines[0])
        }

        resolve(g);
      })
      .catch(reject);
  });
}
