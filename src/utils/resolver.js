import debug from './debug';
import * as xpath from './xpath';

/**
 * Resolve element relative to root
 *
 * @param {Element}       root
 * @param {{ path, id }}  data
 * @param {boolean}       throwException
 */
export function resolveElement(root, data, throwException = false) {
  let transformObject = null;
  let { path, id } = data;

  if (id) {
    transformObject = root.querySelector(`[data-spirit-id="${id}"]`);
  }

  if (!transformObject && path) {
    transformObject = xpath.getElement(path, root === document.body ? undefined : root);
  }

  if (!transformObject) {
    if (debug()) {
      console.group('Unable to resolve element');
      console.warn('Timeline: ', data);
      console.groupEnd();
    }

    if (throwException) {
      throw new Error('Cannot find element.');
    }
  }

  return transformObject;
}
