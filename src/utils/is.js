export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isSVG(element) {
  return element instanceof window.SVGElement;
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isNumeric(n) {
  return !isNaN(n);
}
