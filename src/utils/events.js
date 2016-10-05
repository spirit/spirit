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
