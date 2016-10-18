class EvalMap {

  /**
   * Create an evaluable map
   * @param {RegExp} regex
   * @param {*} map
   */
  constructor(regex, map) {
    if (!regex || regex && !(regex instanceof RegExp)) {
      throw new Error('Invalid expression.')
    }

    if (map === null || map === undefined) {
      throw new Error('Invalid mapping.')
    }

    Object.assign(this, { regex, map })
  }

}

export default EvalMap
