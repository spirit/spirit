import config from '../config/config';
import { gsap, debug, resolver, xpath, is } from '../utils';
import Timelines from './timelines';
import { emitChange } from '../utils/emitter';
import { TimelineError } from '../utils/errors';
import { Emitter } from '../utils/events';
import { isGSAPTimeline } from '../utils/gsap';

/**
 * Group.
 */
class Group extends Emitter {
  _name = 'untitled';
  _timeScale = 1;
  _timelines = new Timelines();

  timeline = null;

  /**
   * Create a group instance.
   *
   * @param {object} props
   */
  constructor(props = {}) {
    super();

    if (!props.name || typeof props.name !== 'string' || props.name.trim() === '') {
      throw new Error('Cannot create group without a name.');
    }

    const defaults = {
      name: 'untitled',
      timeScale: 1,
      timelines: new Timelines(),
    };

    Object.assign(this, {
      ...defaults,
      ...props,
    });
  }

  /**
   * Get timelines
   *
   * @returns {Timelines}
   */
  get timelines() {
    return this._timelines;
  }

  /**
   * Get unresolved timelines
   *
   * @returns {Timelines}
   */
  get unresolved() {
    let timelines = new Timelines();
    this.timelines.each(tl => !tl.transformObject && timelines.add(tl));
    return timelines;
  }

  /**
   * Get resolved timelines
   *
   * @returns {Timelines}
   */
  get resolved() {
    let timelines = new Timelines();
    this.timelines.each(tl => !!tl.transformObject && timelines.add(tl));
    return timelines;
  }

  /**
   * Set timelines
   *
   * @param {Timelines} timelines
   */
  @emitChange()
  set timelines(timelines) {
    if (!(timelines instanceof Timelines)) {
      timelines = new Timelines(Array.from(timelines));
    }
    this._timelines = timelines;
  }

  /**
   * Get current timeScale
   *
   * @returns {number}
   */
  get timeScale() {
    return this._timeScale;
  }

  /**
   * Set timeScale
   *
   * @param {number} scale
   */
  @emitChange()
  set timeScale(scale) {
    if (!(typeof scale === 'number' && Number.isFinite(scale))) {
      throw new Error('timeScale needs to be a number');
    }

    if (isGSAPTimeline(this.timeline)) {
      this.timeline.timeScale(scale);
    }

    this._timeScale = scale;
  }

  /**
   * Get the timeline duration.
   * Equal to this.timeline.duration()
   *
   * @returns {number}
   */
  get duration() {
    return this.timeline ? this.timeline.duration() : 0;
  }

  /**
   * Set the timeline duration.
   * Updates the group timeScale
   *
   * @param {number} val
   */
  @emitChange()
  set duration(val) {
    if (isGSAPTimeline(this.timeline)) {
      this.timeline.duration(val);
      this.timeScale = this.timeline.timeScale();
      this._duration = this.timeline.duration();
    }
  }

  /**
   * Get name
   *
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Set name
   *
   * @param {string} name
   */
  @emitChange()
  set name(name) {
    if (typeof name !== 'string') {
      throw new Error('Name needs to be a string');
    }
    this._name = name;
  }

  /**
   * Convert group to object
   *
   * @returns {object}
   */
  toObject() {
    const name = this.name;
    const timeScale = this.timeScale;
    const timelines = this.timelines.toArray();

    return { name, timeScale, timelines };
  }

  reset() {
    let killed = false;
    if (this.timeline) {
      killed = true;
      gsap.killTimeline(this.timeline);

      // reset styles
      this.timelines.each(tl => {
        if (tl.type === 'dom' && tl.transformObject instanceof window.Element) {
          tl._style && tl.transformObject.setAttribute('style', tl._style);
        }
      });
    }
    return killed;
  }

  /**
   * Resolve transformObject for timelines
   *
   * @returns {Group}
   */
  resolve() {
    this.reset();

    const root = this._list && this._list.rootEl ? this._list.rootEl : null;

    if (!root) {
      return this;
    }

    let hasUnresolved = false;

    this.timelines.each(timeline => {
      if (timeline.type === 'dom') {
        timeline.transformObject = !root ? null : resolver.resolveElement(root, timeline);

        if (timeline.transformObject) {
          timeline.path = xpath.getExpression(timeline.transformObject, root);
        }

        if (!hasUnresolved && !timeline.transformObject) {
          hasUnresolved = true;
        }
      }
    });

    this.emit('resolve', {
      resolved: this.resolved,
      unresolved: this.unresolved,
    });

    if (hasUnresolved) {
      if (debug()) {
        console.warn(
          `Could not resolve all elements for group ${this.name}`,
          this.unresolved
        );
      }
      this.emit('unresolve', this.unresolved);
    }

    return this;
  }

  /**
   * Construct GSAP timeline
   *
   * @param   {boolean} resolve elements
   * @returns {gsap.timeline}
   */
  construct(resolve = false) {
    try {
      if (!gsap.has()) {
        if (debug()) {
          console.warn(`Cannot construct group ${this.name}. GSAP not found.`);
        }
        throw new Error('GSAP cannot be found');
      }

      if (resolve) {
        this.resolve();
      }

      if (!this.reset()) {
        const tl = config.gsap.instance.timeline({ paused: true }); // eslint-disable-line new-cap
        this.timeline = tl;
      }

      this.resolved.each(timeline => {
        if (
          timeline.type === 'dom' &&
          timeline.transformObject instanceof window.Element
        ) {
          try {
            this.timeline.add(gsap.generateTimeline(timeline).play(), 0, 'start');
          } catch (err) {
            throw new TimelineError(err.message, timeline.transformObject, err.stack);
          }
        }
      });

      this.timeline.timeScale(this.timeScale);
      this._duration = this.timeline.duration();
    } catch (err) {
      err.message = `Could not construct timeline: ${err.message}`;
      throw err;
    }

    this.emit('construct', this.timeline);
    return this.timeline;
  }
}

Group.fromObject = function(obj) {
  return new Group(obj);
};

export default Group;
