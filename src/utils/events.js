import List from '../list/list';
import mitt from 'mitt';

/**
 * Bubble events.
 *
 * @param   {string}  evt
 * @param   {*}       scope event emitter
 * @returns {function}
 */
export function bubbleEvent(evt, scope) {
  if (!(scope instanceof Emitter)) {
    throw new Error('Scope needs to be an emitter.');
  }

  return function() {
    this.emit(evt, ...arguments);

    if (this._list instanceof List) {
      this._list.emit(evt, ...arguments);
    }
  }.bind(scope);
}

/**
 * Create an event object for model.
 *
 * @param   {*}       model model class
 * @param   {*}       obj model instance
 * @param   {string}  prop change property
 * @param   {*}       prevVal the previous value
 * @param   {*}       nextVal the next value
 * @returns {Object}  event object.
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
      to: nextVal,
    },
  };

  return evt;
}

/**
 * Minimal event emitter
 */
export class Emitter {
  _events = {};
  _emitter = mitt(this._events);

  eventNames() {
    return Object.keys(this._events);
  }

  emit(eventName, ...args) {
    this._emitter.emit(eventName, ...args);
  }

  on(event, listener) {
    this._emitter.on(event, listener);
  }

  removeListener(event, listener) {
    this._emitter.off(event, listener);
  }

  removeAllListeners() {
    Object.keys(this._events).forEach(evt => {
      const listeners = this._events[evt];
      listeners.forEach(listener => this._emitter.off(evt, listener));
    });
  }
}
