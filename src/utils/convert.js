/**
 * Convert object to array
 *
 * @param   {object} obj
 * @returns {Array}
 */
export function objectToArray(obj) {
  return Object.keys(obj).reduce((a, b) => {
    a.push({ [b]: obj[b] });
    return a;
  }, []);
}

/**
 * Convert array to object
 *
 * @param   {Array} arr
 * @returns {object}
 */
export function arrayToObject(arr) {
  return arr.reduce((a, b) => {
    a = { ...a, ...b };
    return a;
  }, {});
}
