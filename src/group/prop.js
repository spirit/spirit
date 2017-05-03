import { EventEmitter } from 'events'
import Keyframes from './keyframes'
import { is, events } from '../utils'
import { emitChange } from '../utils/emitter'

/**
 * -------------------------------------------
 * Single Property.
 *
 * @example
 *
 *    {
 *      x: {
 *        "0.1s": { value: 10,  ease: null },
 *        "0.2s": { value: 0,   ease: null },
 *        "0.3s": { value: 100, ease: "Power3.easeOut" },
 *      }
 *    }
 *
 * @fires Prop#change
 * @fires Prop#change:name
 * @fires Prop#change:keyframes
 * @fires Prop#change:keyframes:time
 * @fires Prop#change:keyframes:value
 * @fires Prop#change:keyframes:ease
 *
 * @fires List#change
 * @fires List#change:name
 * @fires List#change:keyframes
 * @fires List#change:keyframes:time
 * @fires List#change:keyframes:value
 * @fires List#change:keyframes:ease
 *
 * -------------------------------------------
 */

@emitChange('name', null, [
  { validator: val => typeof val === 'string', message: 'Name must be a string' },
  { validator: val => !/\d+/.test(val), message: 'Name must be a string' }
])

class Prop extends EventEmitter {

  _keyframes = null
  _list = null

  constructor(name, keyframes = new Keyframes()) {
    super()
    this.setMaxListeners(Infinity)

    if (!(keyframes instanceof Keyframes)) {
      keyframes = new Keyframes(keyframes)
    }

    name = name || null

    Object.assign(this, { name, keyframes })
  }

  next() {
    return this._next
  }

  prev() {
    return this._prev
  }

  get list() {
    return this._list
  }

  get keyframes() {
    return this._keyframes
  }

  @emitChange()
  set keyframes(kf) {
    if (!(kf instanceof Keyframes)) {
      kf = new Keyframes(kf)
    }

    if (this._keyframes) {
      events.clearEvents(this._keyframes, Keyframes.Events)
      this._keyframes.clear()
    }

    this._keyframes = kf

    this.setupBubbleEvents()
  }

  setupBubbleEvents() {
    if (this._keyframes instanceof Keyframes) {
      events.clearEvents(this._keyframes, Keyframes.Events)

      this._keyframes.on('change', events.bubbleEvent('change:keyframe', this))
      this._keyframes.on('change:time', events.bubbleEvent('change:keyframe:time', this))
      this._keyframes.on('change:value', events.bubbleEvent('change:keyframe:value', this))
      this._keyframes.on('change:ease', events.bubbleEvent('change:keyframe:ease', this))
      this._keyframes.on('change:list', events.bubbleEvent('change:keyframe:list', this))
      this._keyframes.on('add', events.bubbleEvent('add:keyframe', this))
      this._keyframes.on('remove', events.bubbleEvent('remove:keyframe', this))
    }
  }

  toObject() {
    const keyframes = this.keyframes ? this.keyframes.toObject() : {}
    return { [this.name]: keyframes }
  }

  isCSSTransform() {
    return [
      'x', 'y', 'z',
      'rotateX', 'rotateY', 'rotateZ',
      'skewX', 'skewY',
      'scale', 'scaleX', 'scaleY'
    ].includes(this.name)
  }

}

Prop.fromObject = function(obj) {
  if (!is.isObject(obj)) {
    throw new Error('Object is invalid')
  }

  const keys = Object.keys(obj)

  if (keys.length === 0) {
    throw new Error('Object is invalid')
  }

  for (let i in obj) {
    if (!is.isObject(obj[i])) {
      throw new Error('Object is invalid')
    }
  }

  const p = keys[0]
  return new Prop(p, obj[p])
}

Prop.Events = [
  'change',
  'change:name',
  'change:keyframes',
  'change:keyframe',
  'change:keyframe:time',
  'change:keyframe:value',
  'change:keyframe:ease',
  'add:keyframe',
  'remove:keyframe'
]

export default Prop
