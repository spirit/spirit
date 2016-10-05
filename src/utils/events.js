import { EventEmitter } from 'events'

/**
 * Bubble events.
 * @param {string} evt
 * @param {*} scope event emitter
 * @returns {function}
 */
export function bubbleEvent(evt, scope) {
  if (!(scope instanceof EventEmitter)) {
    throw new Error('Scope needs to be an event emitter.')
  }

  return function() {
    this.emit(evt, ...arguments)
  }.bind(scope)
}

/**
 * Create an event object for model.
 *
 * @param {*} model model class
 * @param {*} obj model instance
 * @param {string} prop change property
 * @param prevVal the previous value
 * @param nextVal the next value
 * @returns {Object} event object.
 */
export function createEventObjectForModel(model, obj, prop, prevVal, nextVal) {
  /**
   * Event object.
   *
   * @type {object}
   * @property {object} prevModel - param before change
   * @property {object} model - param after change
   * @property {object} changed - {type, from, to}
   */
  const evt = {
    prevModel: model.fromObject(obj),
    model: model.fromObject({ ...obj, [prop]: nextVal }),
    changed: {
      type: prop,
      from: prevVal,
      to: nextVal
    }
  }

  return evt
}

/**
 * Clean up events.
 * @param {*} emitter
 * @param {Array} events fallback for older node implementations
 */
export function clearEvents(emitter, events = []) {
  if (emitter.eventNames && typeof emitter.eventNames === 'function') {
    emitter.eventNames().forEach(e => emitter.removeAllListeners(e))
  }else{
    events.forEach(e => emitter.removeAllListeners(e))
  }
}
