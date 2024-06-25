/*!
 * Spirit.js v3.1.16
 *
 * (c) 2024 Patrick Brouwer
 * Released under the MIT License.
 */
var spirit;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/context */ "./src/utils/context.js");

var Config = function Config() {
  this.debug =  true && (0,_utils_context__WEBPACK_IMPORTED_MODULE_0__.isBrowser)();
  this.overwriteAnimations = true;
  this.gsap = {
    instance: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap@3.1.1/dist/gsap.min.js'
  };
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Config());

/***/ }),

/***/ "./src/config/setup.js":
/*!*****************************!*\
  !*** ./src/config/setup.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ setup)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/config/config.js");
/* harmony import */ var _utils_gsap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/gsap */ "./src/utils/gsap.js");




/**
 * Setup Spirit GSAP
 *
 * @param {object} gsapInstance
 */
function setup(gsapInstance) {
  if (gsapInstance === void 0) {
    gsapInstance = null;
  }
  return new Promise(function (resolve, reject) {
    if ((0,_utils_gsap__WEBPACK_IMPORTED_MODULE_2__.isGSAPInstance)(gsapInstance)) {
      _config__WEBPACK_IMPORTED_MODULE_1__["default"].gsap.instance = gsapInstance;
    }
    _utils__WEBPACK_IMPORTED_MODULE_0__.gsap.ensure().then(resolve)["catch"](reject);
  });
}

/***/ }),

/***/ "./src/data/parser.js":
/*!****************************!*\
  !*** ./src/data/parser.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   create: () => (/* binding */ create),
/* harmony export */   load: () => (/* binding */ load)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../group */ "./src/group/index.js");



/**
 * Create groups factory
 *
 * @return {{add: {function} add, groups: {array|Groups} groups}}
 */
function groupsFactory() {
  var list = [];
  var getGroupsByRoot = function getGroupsByRoot(root) {
    for (var i = 0; i < list.length; i++) {
      var groups = list[i];
      if (groups.rootEl === root) {
        return groups;
      }
    }
    return null;
  };
  return {
    add: function add(root, group) {
      var groups = getGroupsByRoot(root);
      if (!groups) {
        groups = new _group__WEBPACK_IMPORTED_MODULE_1__.Groups(root, []);
        list.push(groups);
      }
      if (group) {
        group._list = groups;
        group.resolve();
        groups.add(group);
      }
    },
    groups: function groups() {
      return list.length === 1 ? list[0] : list;
    }
  };
}

/**
 * Parse groups
 *
 * @param   {object|Array}  data  animation data
 * @param   {Element}       root  the root element for animation groups
 * @returns Groups
 */
function create(data, root) {
  if (root === void 0) {
    root = undefined;
  }
  if (!_utils__WEBPACK_IMPORTED_MODULE_0__.context.isBrowser()) {
    throw new Error('Invalid context. spirit.create() can only be executed in the browser.');
  }
  var resolveRoot = false;

  // ensure root element
  if (!(root instanceof window.Element)) {
    resolveRoot = true;
    root = document.body || document.documentElement;
  }
  if (_utils__WEBPACK_IMPORTED_MODULE_0__.is.isObject(data) && data['groups'] && Array.isArray(data['groups'])) {
    data = data['groups'];
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  var factory = groupsFactory();
  if (data.length === 0) {
    factory.add(root, null);
  }
  data.forEach(function (g) {
    var groupRoot = root;
    if (resolveRoot && g.root) {
      groupRoot = _utils__WEBPACK_IMPORTED_MODULE_0__.resolver.resolveElement(root, g.root);
      if (!groupRoot) {
        groupRoot = root;
      }
    }
    var d = {
      name: g.name,
      timeScale: g.timeScale || 1,
      timelines: []
    };
    var timelines = g.timelines || [];
    timelines.forEach(function (timeline) {
      d.timelines.push({
        type: timeline.type,
        props: timeline.props,
        label: timeline.label || timeline.id || timeline.path,
        path: timeline.path || null,
        id: timeline.id || null
      });
    });
    factory.add(groupRoot, new _group__WEBPACK_IMPORTED_MODULE_1__.Group(d));
  });
  return factory.groups();
}

/**
 * Load data and apply it to element
 *
 * @param   {string}  url
 * @param   {Element} root
 * @returns {Promise}
 */
function load(url, root) {
  if (root === void 0) {
    root = undefined;
  }
  if (!_utils__WEBPACK_IMPORTED_MODULE_0__.context.isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in the browser.'));
  }
  return (0,_utils__WEBPACK_IMPORTED_MODULE_0__.jsonloader)(url).then(function (data) {
    return create(data, root);
  });
}

/***/ }),

/***/ "./src/group/evalmap.js":
/*!******************************!*\
  !*** ./src/group/evalmap.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var EvalMap =
/**
 * Create an evaluable map
 *
 * @param {RegExp}  regex
 * @param {*}       map
 */
function EvalMap(regex, map) {
  if (!regex || regex && !(regex instanceof RegExp)) {
    throw new Error('Invalid expression.');
  }
  if (map === null || map === undefined) {
    throw new Error('Invalid mapping.');
  }
  Object.assign(this, {
    regex: regex,
    map: map
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (EvalMap);

/***/ }),

/***/ "./src/group/group.js":
/*!****************************!*\
  !*** ./src/group/group.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _timelines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timelines */ "./src/group/timelines.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/errors */ "./src/utils/errors.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _utils_gsap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/gsap */ "./src/utils/gsap.js");
var _dec, _dec2, _dec3, _dec4, _class;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer && (Object.defineProperty(i, e, a), a = null), a; }








/**
 * Group.
 */
var Group = (_dec = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_3__.emitChange)(), _dec2 = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_3__.emitChange)(), _dec3 = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_3__.emitChange)(), _dec4 = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_3__.emitChange)(), (_class = /*#__PURE__*/function (_Emitter) {
  /**
   * Create a group instance.
   *
   * @param {object} props
   */
  function Group(props) {
    var _this;
    if (props === void 0) {
      props = {};
    }
    _this = _Emitter.call(this) || this;
    _this._name = 'untitled';
    _this._timeScale = 1;
    _this._timelines = new _timelines__WEBPACK_IMPORTED_MODULE_2__["default"]();
    _this.timeline = null;
    if (!props.name || typeof props.name !== 'string' || props.name.trim() === '') {
      throw new Error('Cannot create group without a name.');
    }
    var defaults = {
      name: 'untitled',
      timeScale: 1,
      timelines: new _timelines__WEBPACK_IMPORTED_MODULE_2__["default"]()
    };
    Object.assign(_this, _objectSpread(_objectSpread({}, defaults), props));
    return _this;
  }

  /**
   * Get timelines
   *
   * @returns {Timelines}
   */
  _inheritsLoose(Group, _Emitter);
  var _proto = Group.prototype;
  /**
   * Convert group to object
   *
   * @returns {object}
   */
  _proto.toObject = function toObject() {
    var name = this.name;
    var timeScale = this.timeScale;
    var timelines = this.timelines.toArray();
    return {
      name: name,
      timeScale: timeScale,
      timelines: timelines
    };
  };
  _proto.reset = function reset() {
    var killed = false;
    if (this.timeline) {
      killed = true;
      _utils__WEBPACK_IMPORTED_MODULE_1__.gsap.killTimeline(this.timeline);

      // reset styles
      this.timelines.each(function (tl) {
        if (tl.type === 'dom' && tl.transformObject instanceof window.Element) {
          if (tl._style) tl.transformObject.setAttribute('style', tl._style);
          if (tl._transform) tl.transformObject.setAttribute('transform', '');
        }
      });
    }
    return killed;
  }

  /**
   * Resolve transformObject for timelines
   *
   * @returns {Group}
   */;
  _proto.resolve = function resolve() {
    this.reset();
    var root = this._list && this._list.rootEl ? this._list.rootEl : null;
    if (!root) {
      return this;
    }
    var hasUnresolved = false;
    this.timelines.each(function (timeline) {
      if (timeline.type === 'dom') {
        timeline.transformObject = !root ? null : _utils__WEBPACK_IMPORTED_MODULE_1__.resolver.resolveElement(root, timeline);
        if (timeline.transformObject) {
          timeline.path = _utils__WEBPACK_IMPORTED_MODULE_1__.xpath.getExpression(timeline.transformObject, root);
        }
        if (!hasUnresolved && !timeline.transformObject) {
          hasUnresolved = true;
        }
      }
    });
    this.emit('resolve', {
      resolved: this.resolved,
      unresolved: this.unresolved
    });
    if (hasUnresolved) {
      if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.debug)()) {
        console.warn("Could not resolve all elements for group " + this.name, this.unresolved);
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
   */;
  _proto.construct = function construct(resolve) {
    var _this2 = this;
    if (resolve === void 0) {
      resolve = false;
    }
    try {
      if (!_utils__WEBPACK_IMPORTED_MODULE_1__.gsap.has()) {
        if ((0,_utils__WEBPACK_IMPORTED_MODULE_1__.debug)()) {
          console.warn("Cannot construct group " + this.name + ". GSAP not found.");
        }
        throw new Error('GSAP cannot be found');
      }
      if (resolve) {
        this.resolve();
      }
      if (!this.reset()) {
        this.timeline = _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance.timeline({
          paused: true
        }); // eslint-disable-line new-cap
      }
      this.resolved.each(function (timeline) {
        if (timeline.type === 'dom' && timeline.transformObject instanceof window.Element) {
          try {
            _this2.timeline.add(_utils__WEBPACK_IMPORTED_MODULE_1__.gsap.generateTimeline(timeline).play(), 0, 'start');
          } catch (err) {
            throw new _utils_errors__WEBPACK_IMPORTED_MODULE_4__.TimelineError(err.message, timeline.transformObject, err.stack);
          }
        }
      });
      this.timeline.timeScale(this.timeScale);
      this._duration = this.timeline.duration();
    } catch (err) {
      err.message = "Could not construct timeline: " + err.message;
      throw err;
    }
    this.emit('construct', this.timeline);
    return this.timeline;
  };
  return _createClass(Group, [{
    key: "timelines",
    get: function get() {
      return this._timelines;
    }

    /**
     * Get unresolved timelines
     *
     * @returns {Timelines}
     */,
    set:
    /**
     * Set timelines
     *
     * @param {Timelines} timelines
     */
    function set(timelines) {
      if (!(timelines instanceof _timelines__WEBPACK_IMPORTED_MODULE_2__["default"])) {
        timelines = new _timelines__WEBPACK_IMPORTED_MODULE_2__["default"](Array.from(timelines));
      }
      this._timelines = timelines;
    }

    /**
     * Get current timeScale
     *
     * @returns {number}
     */
  }, {
    key: "unresolved",
    get: function get() {
      var timelines = new _timelines__WEBPACK_IMPORTED_MODULE_2__["default"]();
      this.timelines.each(function (tl) {
        return !tl.transformObject && timelines.add(tl);
      });
      return timelines;
    }

    /**
     * Get resolved timelines
     *
     * @returns {Timelines}
     */
  }, {
    key: "resolved",
    get: function get() {
      var timelines = new _timelines__WEBPACK_IMPORTED_MODULE_2__["default"]();
      this.timelines.each(function (tl) {
        return !!tl.transformObject && timelines.add(tl);
      });
      return timelines;
    }
  }, {
    key: "timeScale",
    get: function get() {
      return this._timeScale;
    }

    /**
     * Set timeScale
     *
     * @param {number} scale
     */,
    set: function set(scale) {
      if (!(typeof scale === 'number' && Number.isFinite(scale))) {
        throw new Error('timeScale needs to be a number');
      }
      if ((0,_utils_gsap__WEBPACK_IMPORTED_MODULE_6__.isGSAPTimeline)(this.timeline)) {
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
  }, {
    key: "duration",
    get: function get() {
      return this.timeline ? this.timeline.duration() : 0;
    }

    /**
     * Set the timeline duration.
     * Updates the group timeScale
     *
     * @param {number} val
     */,
    set: function set(val) {
      if ((0,_utils_gsap__WEBPACK_IMPORTED_MODULE_6__.isGSAPTimeline)(this.timeline)) {
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
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }

    /**
     * Set name
     *
     * @param {string} name
     */,
    set: function set(name) {
      if (typeof name !== 'string') {
        throw new Error('Name needs to be a string');
      }
      this._name = name;
    }
  }]);
}(_utils_events__WEBPACK_IMPORTED_MODULE_5__.Emitter), (_applyDecoratedDescriptor(_class.prototype, "timelines", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "timelines"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "timeScale", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "timeScale"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "duration", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "duration"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "name", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "name"), _class.prototype)), _class));
Group.fromObject = function (obj) {
  return new Group(obj);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Group);

/***/ }),

/***/ "./src/group/groups.js":
/*!*****************************!*\
  !*** ./src/group/groups.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/group/group.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _registry_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../registry/registry */ "./src/registry/registry.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }




var Groups = /*#__PURE__*/function (_List) {
  /**
   * Create a groups instance.
   *
   * @param {HTMLElement} rootEl define the animation root
   * @param {Array} data
   */
  function Groups(rootEl, data) {
    var _this;
    if (rootEl === void 0) {
      rootEl = document.body;
    }
    if (data === void 0) {
      data = [];
    }
    _this = _List.call(this, data, _group__WEBPACK_IMPORTED_MODULE_1__["default"], [{
      name: 'untitled'
    }]) || this;
    _this.rootEl = null;
    if (!(rootEl instanceof window.Element)) {
      throw new Error('No root element provided.');
    }
    _this.rootEl = rootEl;

    // add groups to registry
    _this.each(function (g) {
      return _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].add(g);
    });
    return _this;
  }

  /**
   * Add group to list and global registry
   *
   * @param   {Array|*} group
   * @returns {Array|*}
   */
  _inheritsLoose(Groups, _List);
  var _proto = Groups.prototype;
  _proto.add = function add(group) {
    var affected = _List.prototype.add.call(this, group);
    Array.isArray(affected) ? affected.forEach(function (g) {
      return _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].add(g);
    }) : _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].add(affected);
    return affected;
  }

  /**
   * Remove group from list and global registry
   *
   * @param   {Array|*} group
   * @returns {Array|*}
   */;
  _proto.remove = function remove(group) {
    var affected = _List.prototype.remove.call(this, group);
    Array.isArray(affected) ? affected.forEach(function (g) {
      return _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].remove(g);
    }) : _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].remove(affected);
    return affected;
  }

  /**
   * Construct all groups
   *
   * @returns {Array.<TimelineLite|TimelineMax>}
   */;
  _proto.construct = function construct(resolve) {
    if (resolve === void 0) {
      resolve = false;
    }
    if (!_utils__WEBPACK_IMPORTED_MODULE_2__.gsap.has()) {
      (0,_utils__WEBPACK_IMPORTED_MODULE_2__.debug)() && console.warn('Trying to construct groups, but GSAP cannot be found.');
      throw new Error('GSAP cannot be found');
    }
    return this.list.map(function (group) {
      return group.construct(resolve);
    });
  }

  /**
   * Get group by name
   *
   * @param   {string} name
   * @returns {Group|undefined}
   */;
  _proto.get = function get(name) {
    return this.list.find(function (group) {
      return group.name === name;
    });
  };
  return Groups;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Groups);

/***/ }),

/***/ "./src/group/index.js":
/*!****************************!*\
  !*** ./src/group/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EvalMap: () => (/* reexport safe */ _evalmap__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Group: () => (/* reexport safe */ _group__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Groups: () => (/* reexport safe */ _groups__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Keyframe: () => (/* reexport safe */ _keyframe__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Keyframes: () => (/* reexport safe */ _keyframes__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   Prop: () => (/* reexport safe */ _prop__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   Props: () => (/* reexport safe */ _props__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   Timeline: () => (/* reexport safe */ _timeline__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   Timelines: () => (/* reexport safe */ _timelines__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _evalmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evalmap */ "./src/group/evalmap.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/group/group.js");
/* harmony import */ var _groups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./groups */ "./src/group/groups.js");
/* harmony import */ var _keyframe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keyframe */ "./src/group/keyframe.js");
/* harmony import */ var _keyframes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyframes */ "./src/group/keyframes.js");
/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./prop */ "./src/group/prop.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./props */ "./src/group/props.js");
/* harmony import */ var _timeline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./timeline */ "./src/group/timeline.js");
/* harmony import */ var _timelines__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./timelines */ "./src/group/timelines.js");











/***/ }),

/***/ "./src/group/keyframe.js":
/*!*******************************!*\
  !*** ./src/group/keyframe.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
var _dec, _dec2, _dec3, _class, _class2;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer && (Object.defineProperty(i, e, a), a = null), a; }




/**
 * -------------------------------------------
 * Single keyframe.
 *
 * @example
 *
 *    {
 *      "0.1s": { value: 10, ease: "Linear.easeNone" }
 *    }
 *
 * @fires Keyframe#change
 * @fires Keyframe#change:time
 * @fires Keyframe#change:value
 * @fires Keyframe#change:ease
 *
 * @fires List#change
 * @fires List#change:time
 * @fires List#change:value
 * @fires List#change:ease
 *
 * -------------------------------------------
 */
var Keyframe = (_dec = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_1__.emitChange)('time', null, [{
  validator: function validator(val) {
    return typeof val === 'number';
  },
  message: 'Time must be a number'
}]), _dec2 = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_1__.emitChange)('ease', null), _dec3 = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_1__.emitChange)(), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_Emitter) {
  /**
   * Keyframe.
   *
   * @param {number}  time    position (in seconds) on timeline
   * @param {*}       value   value assigned
   * @param {string}  ease    easing value (optional)
   */
  function Keyframe(time, value, ease) {
    var _this;
    if (ease === void 0) {
      ease = null;
    }
    _this = _Emitter.call(this) || this;
    _this._list = null;
    _this._value = null;
    _this.mappings = [];
    ease = ease || null;
    Object.assign(_this, {
      time: time,
      value: value,
      ease: ease
    });
    return _this;
  }

  /**
   * Get next keyframe (linked list)
   *
   * @returns {Keyframe|null}
   */
  _inheritsLoose(Keyframe, _Emitter);
  var _proto = Keyframe.prototype;
  _proto.next = function next() {
    return this._next;
  }

  /**
   * Get previous keyframe (linked list)
   *
   * @returns {Keyframe|null}
   */;
  _proto.prev = function prev() {
    return this._prev;
  }

  /**
   * Get the  value
   *
   * @returns {*}
   */;
  /**
   * Check if current keyframe has an evaluable value
   *
   * @returns {boolean}
   */
  _proto.isEval = function isEval() {
    return /{(.*?)}/.test(this._value);
  }

  /**
   * Convert to readable object
   *
   * @param   {boolean} ignoreEval
   * @returns {object} { "0.2s": { value: 10, ease: "Linear.easeNone" }}
   */;
  _proto.toObject = function toObject(ignoreEval) {
    var _ref;
    if (ignoreEval === void 0) {
      ignoreEval = false;
    }
    var value;
    try {
      value = ignoreEval ? this._value : this.value;
    } catch (err) {
      value = this._value;
    }
    return _ref = {}, _ref[this.time + "s"] = {
      value: value,
      ease: this.ease
    }, _ref;
  }

  /**
   * Destroy events
   */;
  _proto.destroy = function destroy() {
    this.removeAllListeners();
  };
  return _createClass(Keyframe, [{
    key: "value",
    get: function get() {
      var _this2 = this;
      if (this.isEval()) {
        // create available mappings for current value
        var mappings = this.mappings.reduce(function (result, mapping) {
          if (mapping.regex.global) {
            mapping.regex.lastIndex = 0;
          }
          if (mapping.regex.test(_this2._value)) {
            result[mapping.regex] = mapping;
          }
          return result;
        }, {});

        // apply mappings
        var val = this._value;
        for (var mapping in mappings) {
          val = val.replace(mappings[mapping].regex, "mappings[" + mapping + "].map");
        }
        var res;
        try {
          res = eval(val); // eslint-disable-line no-eval
        } catch (err) {
          if (this.mappings.length > 0) {
            throw err;
          }
        }
        return res;
      }
      return this._value;
    }

    /**
     * Set value
     *
     * @param {*} val
     */,
    set: function set(val) {
      this._value = val;
    }

    /**
     * Get the list where this keyframe is added to
     *
     * @returns {Keyframes|null}
     */
  }, {
    key: "list",
    get: function get() {
      return this._list;
    }
  }]);
}(_utils_events__WEBPACK_IMPORTED_MODULE_2__.Emitter), (_applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "value"), _class2.prototype)), _class2)) || _class) || _class);
/**
 * Create keyframe instance from object
 *
 * @example { "0.2s": { value: 10, ease: "Linear.easeNone" }}
 * @param   {object} obj
 * @returns {Keyframe}
 */
Keyframe.fromObject = function (obj) {
  if (!_utils__WEBPACK_IMPORTED_MODULE_0__.is.isObject(obj)) {
    throw new Error('Object is invalid');
  }
  var keys = Object.keys(obj);
  if (keys.length === 0 || keys.length > 1) {
    throw new Error('Object is invalid');
  }
  var time = keys[0];
  var _obj$time = obj[time],
    value = _obj$time.value,
    ease = _obj$time.ease;
  if (!_utils__WEBPACK_IMPORTED_MODULE_0__.is.isObject(obj[time]) && (typeof obj[time] === 'string' || typeof obj[time] === 'number')) {
    value = obj[time];
    ease = null;
  }
  time = parseFloat(time);
  if (isNaN(time)) {
    throw new Error('Object is invalid. Invalid time object { `1s`: ... }');
  }
  if (value === undefined || value === null) {
    throw new Error('Object is invalid. No value found: {value}');
  }
  return new Keyframe(time, value, ease);
};
Keyframe.Events = ['change', 'change:time', 'change:value', 'change:ease'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyframe);

/***/ }),

/***/ "./src/group/keyframes.js":
/*!********************************!*\
  !*** ./src/group/keyframes.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _keyframe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyframe */ "./src/group/keyframe.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var Keyframes = /*#__PURE__*/function (_List) {
  /**
   * Create keyframes
   *
   * @constructor
   * @param {Array|object} keyframes
   */
  function Keyframes(keyframes) {
    var _this;
    if (keyframes === void 0) {
      keyframes = [];
    }
    if (_utils__WEBPACK_IMPORTED_MODULE_2__.is.isObject(keyframes)) {
      keyframes = _utils__WEBPACK_IMPORTED_MODULE_2__.convert.objectToArray(keyframes);
    }
    _this = _List.call(this, keyframes, _keyframe__WEBPACK_IMPORTED_MODULE_1__["default"], [0, 0]) || this;
    _this.duplicates = {
      prop: 'time'
    };
    _this.sortOn = 'time';
    _this.linkedList = true;
    _this._mappings = [];
    return _this;
  }

  /**
   * Add keyframe
   *
   * @param {*|Array} keyframe
   * @returns {*}
   */
  _inheritsLoose(Keyframes, _List);
  var _proto = Keyframes.prototype;
  _proto.add = function add(keyframe) {
    var _this2 = this;
    if (_utils__WEBPACK_IMPORTED_MODULE_2__.is.isObject(keyframe) && !(keyframe instanceof _keyframe__WEBPACK_IMPORTED_MODULE_1__["default"]) && Object.keys(keyframe).length > 1) {
      keyframe = _utils__WEBPACK_IMPORTED_MODULE_2__.convert.objectToArray(keyframe);
    }
    var affected = _List.prototype.add.call(this, keyframe);
    var exec = function exec(keyframe) {
      keyframe.mappings = [].concat(_this2.mappings);
    };
    Array.isArray(affected) ? affected.forEach(exec) : exec(affected);
    return affected;
  }

  /**
   * Remove keyframe
   *
   * @param {Keyframe}
   * @returns {Keyframe}
   */;
  _proto.remove = function remove(keyframe) {
    var affected = _List.prototype.remove.call(this, keyframe);
    var exec = function exec(keyframe) {
      keyframe.mappings = [];
    };
    Array.isArray(affected) ? affected.forEach(exec) : exec(affected);
    return affected;
  }

  /**
   * Get mappings for these keyframes
   *
   * @returns {Array}
   */;
  /**
   * Get keyframe at time
   *
   * @param   {string} time
   * @returns {Keyframe}
   */
  _proto.get = function get(time) {
    var t = parseFloat(time);

    // get keyframe at time
    return this._list.find(function (p) {
      return p.time === t;
    });
  }

  /**
   * Convert keyframes to object
   *
   * @param   {boolean} ignoreEval
   * @returns {object}
   */;
  _proto.toObject = function toObject(ignoreEval) {
    if (ignoreEval === void 0) {
      ignoreEval = false;
    }
    return this.list.reduce(function (obj, keyframe) {
      return _objectSpread(_objectSpread({}, obj), keyframe.toObject(ignoreEval));
    }, {});
  }

  /**
   * Destroy events
   */;
  _proto.destroy = function destroy() {
    this.removeAllListeners();
    this.each(function (keyframe) {
      return keyframe.destroy();
    });
  };
  return _createClass(Keyframes, [{
    key: "mappings",
    get: function get() {
      return this._mappings;
    }

    /**
     * Set mappings for these keyframes
     *
     * @param {Array} mappings
     */,
    set: function set(mappings) {
      this._mappings = mappings;
      this.each(function (keyframe) {
        keyframe.mappings = [].concat(mappings);
      });
    }
  }]);
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);
Keyframes.Events = ['change:list', 'add', 'remove', 'change', 'change:time', 'change:value', 'change:ease'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Keyframes);

/***/ }),

/***/ "./src/group/prop.js":
/*!***************************!*\
  !*** ./src/group/prop.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _keyframes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyframes */ "./src/group/keyframes.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _utils_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/polyfill */ "./src/utils/polyfill.js");
var _dec, _dec2, _class, _class2;
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer && (Object.defineProperty(i, e, a), a = null), a; }






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
 * @fires Prop#change:keyframes:list
 * @fires Prop#change:keyframe
 * @fires Prop#change:keyframe:time
 * @fires Prop#change:keyframe:value
 * @fires Prop#change:keyframe:ease
 * @fires Prop#add:keyframe
 * @fires Prop#remove:keyframe
 *
 * -------------------------------------------
 */
var Prop = (_dec = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_2__.emitChange)('name', null, [{
  validator: function validator(val) {
    return typeof val === 'string';
  },
  message: 'Name must be a string'
}, {
  validator: function validator(val) {
    return !/^\d+\.?\d*?$/.test(val);
  },
  message: 'Name must be a string'
}]), _dec2 = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_2__.emitChange)(), _dec(_class = (_class2 = /*#__PURE__*/function (_Emitter) {
  /**
   * Property.
   *
   * @param {string} name
   * @param {object|Keyframes|Array} keyframes
   */
  function Prop(name, keyframes) {
    var _this;
    if (keyframes === void 0) {
      keyframes = new _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    _this = _Emitter.call(this) || this;
    _this._keyframes = null;
    _this._list = null;
    if (!(keyframes instanceof _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      keyframes = new _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"](keyframes);
    }
    name = name || null;
    Object.assign(_this, {
      name: name,
      keyframes: keyframes
    });
    return _this;
  }

  /**
   * Get next property (linked list)
   *
   * @returns {Prop|null}
   */
  _inheritsLoose(Prop, _Emitter);
  var _proto = Prop.prototype;
  _proto.next = function next() {
    return this._next;
  }

  /**
   * Get previous property (linked list)
   *
   * @returns {Prop|null}
   */;
  _proto.prev = function prev() {
    return this._prev;
  }

  /**
   * Get the list where this prop is added to
   *
   * @returns {Props|null}
   */;
  /**
   * Bubble events from keyframes
   */
  _proto.setupBubbleEvents = function setupBubbleEvents() {
    var _this2 = this;
    if (this._keyframes instanceof _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this._keyframes.removeAllListeners();
      var evt = function evt(from, to) {
        _this2._keyframes.on(from, _utils__WEBPACK_IMPORTED_MODULE_1__.events.bubbleEvent(to, _this2));
      };
      evt('change:list', 'change:keyframes:list');
      evt('change', 'change:keyframe');
      evt('change:time', 'change:keyframe:time');
      evt('change:value', 'change:keyframe:value');
      evt('change:ease', 'change:keyframe:ease');
      evt('add', 'add:keyframe');
      evt('remove', 'remove:keyframe');
    }
  }

  /**
   * Convert Prop to readable object
   *
   * @param   {boolean} ignoreEval
   * @example { x: { "10.5s": { value: 100, ease: "Power2.easeOut" } } }
   * @returns {object}
   */;
  _proto.toObject = function toObject(ignoreEval) {
    var _ref;
    if (ignoreEval === void 0) {
      ignoreEval = false;
    }
    var keyframes = this.keyframes ? this.keyframes.toObject(ignoreEval) : {};
    return _ref = {}, _ref[this.name] = keyframes, _ref;
  }

  /**
   * Determine if this property is a CSS transform
   *
   * @returns {boolean}
   */;
  _proto.isCSSTransform = function isCSSTransform() {
    return (0,_utils_polyfill__WEBPACK_IMPORTED_MODULE_4__.includes)(['x', 'y', 'z', 'rotation', 'rotationZ', 'rotationX', 'rotationY', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY'], this.name);
  }

  /**
   * Destroy.
   * Clear events
   */;
  _proto.destroy = function destroy() {
    if (this._keyframes) {
      this._keyframes.destroy();
    }
    this.removeAllListeners();
  };
  return _createClass(Prop, [{
    key: "list",
    get: function get() {
      return this._list;
    }

    /**
     * Get keyframes
     *
     * @returns {Keyframes|object|Array}
     */
  }, {
    key: "keyframes",
    get: function get() {
      return this._keyframes;
    }

    /**
     * Set keyframes
     *
     * @param {Keyframes|object|Array} kf
     */,
    set: function set(kf) {
      if (!(kf instanceof _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"])) {
        kf = new _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"](kf);
      }
      var mappings = [];
      if (this._keyframes) {
        mappings = this._keyframes.mappings;
        this._keyframes.removeAllListeners();
        this._keyframes.clear();
      }
      this._keyframes = kf;
      this._keyframes.mappings = mappings;
      this.setupBubbleEvents();
    }
  }]);
}(_utils_events__WEBPACK_IMPORTED_MODULE_3__.Emitter), (_applyDecoratedDescriptor(_class2.prototype, "keyframes", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "keyframes"), _class2.prototype)), _class2)) || _class);
/**
 * Create a valid Prop from object
 *
 * @param   {object} obj
 * @returns {Prop}
 */
Prop.fromObject = function (obj) {
  if (!_utils__WEBPACK_IMPORTED_MODULE_1__.is.isObject(obj)) {
    throw new Error('Object is invalid');
  }
  var keys = Object.keys(obj);
  if (keys.length === 0) {
    throw new Error('Object is invalid');
  }
  for (var i in obj) {
    if (!_utils__WEBPACK_IMPORTED_MODULE_1__.is.isObject(obj[i])) {
      throw new Error('Object is invalid');
    }
  }
  var p = keys[0];
  return new Prop(p, obj[p]);
};

/**
 * Prop Events
 *
 * @type {Array}
 */
Prop.Events = ['change', 'change:name', 'change:keyframes', 'change:keyframes:list', 'change:keyframe', 'change:keyframe:time', 'change:keyframe:value', 'change:keyframe:ease', 'add:keyframe', 'remove:keyframe'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Prop);

/***/ }),

/***/ "./src/group/props.js":
/*!****************************!*\
  !*** ./src/group/props.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prop */ "./src/group/prop.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



var Props = /*#__PURE__*/function (_List) {
  /**
   * Create properties
   *
   * @constructor
   * @param {Array|object} props
   */
  function Props(props) {
    var _this;
    if (props === void 0) {
      props = [];
    }
    if (_utils__WEBPACK_IMPORTED_MODULE_2__.is.isObject(props)) {
      props = _utils__WEBPACK_IMPORTED_MODULE_2__.convert.objectToArray(props);
    }
    _this = _List.call(this, props, _prop__WEBPACK_IMPORTED_MODULE_1__["default"], ['prop']) || this;
    _this.duplicates = {
      prop: 'name'
    };
    _this.sortOn = function (a, b) {
      return a.name.localeCompare(b.name);
    };
    _this.linkedList = true;
    _this._mappings = [];
    return _this;
  }

  /**
   * Get property by name
   *
   * @param {string} name
   */
  _inheritsLoose(Props, _List);
  var _proto = Props.prototype;
  _proto.get = function get(name) {
    return this._list.find(function (p) {
      return p.name === name;
    });
  }

  /**
   * Get mappings for these properties
   *
   * @returns {Array}
   */;
  /**
   * Add properties
   *
   * @param {*|Array} k
   * @returns {*}
   */
  _proto.add = function add(prop) {
    var _this2 = this;
    if (_utils__WEBPACK_IMPORTED_MODULE_2__.is.isObject(prop) && !(prop instanceof _prop__WEBPACK_IMPORTED_MODULE_1__["default"]) && Object.keys(prop).length > 1) {
      prop = _utils__WEBPACK_IMPORTED_MODULE_2__.convert.objectToArray(prop);
    }
    var affected = _List.prototype.add.call(this, prop);
    var exec = function exec(prop) {
      prop.keyframes.mappings = [].concat(_this2.mappings);
    };
    Array.isArray(affected) ? affected.forEach(exec) : exec(affected);
    return affected;
  }

  /**
   * Remove property
   *
   * @param {Prop}
   * @returns {Prop}
   */;
  _proto.remove = function remove(prop) {
    var affected = _List.prototype.remove.call(this, prop);
    var exec = function exec(prop) {
      prop.keyframes.mappings = [];
    };
    Array.isArray(affected) ? affected.forEach(exec) : exec(affected);
    return affected;
  }

  /**
   * Does have property with name?
   *
   * @param   {string} name
   * @returns {boolean}
   */;
  _proto.haveProp = function haveProp(name) {
    return !!this.get(name);
  }

  /**
   * Convert properties to object
   *
   * @param   {boolean} ignoreEval
   * @returns {object}
   */;
  _proto.toObject = function toObject(ignoreEval) {
    if (ignoreEval === void 0) {
      ignoreEval = false;
    }
    return this.list.reduce(function (obj, prop) {
      return _objectSpread(_objectSpread({}, obj), prop.toObject(ignoreEval));
    }, {});
  }

  /**
   * Destroy events
   */;
  _proto.destroy = function destroy() {
    this.each(function (prop) {
      return prop.destroy();
    });
    this.removeAllListeners();
  };
  return _createClass(Props, [{
    key: "mappings",
    get: function get() {
      return this._mappings;
    }

    /**
     * Set mappings for these properties
     *
     * @param {Array} mappings
     */,
    set: function set(mappings) {
      this._mappings = mappings;
      this.each(function (prop) {
        prop.keyframes.mappings = [].concat(mappings);
      });
    }
  }]);
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);
Props.Events = ['change:list', 'add', 'remove', 'change', 'change:name', 'change:keyframes', 'change:keyframes:list', 'change:keyframe', 'change:keyframe:time', 'change:keyframe:value', 'change:keyframe:ease', 'add:keyframe', 'remove:keyframe'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Props);

/***/ }),

/***/ "./src/group/timeline.js":
/*!*******************************!*\
  !*** ./src/group/timeline.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./props */ "./src/group/props.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _evalmap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./evalmap */ "./src/group/evalmap.js");
var _dec, _class;
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer && (Object.defineProperty(i, e, a), a = null), a; }






/**
 * Timeline.
 */
var Timeline = (_dec = (0,_utils_emitter__WEBPACK_IMPORTED_MODULE_2__.emitChange)(), (_class = /*#__PURE__*/function (_Emitter) {
  /**
   * Create new Timeline instance
   *
   * @param {string}              type default = dom
   * @param {HTMLElement|object}  transformObject
   * @param {Array|Props|object}  props
   * @param {string|null}         path
   * @param {string|null}         id
   * @param {string|null}         label
   */
  function Timeline(type, transformObject, props, path, id, label) {
    var _this;
    if (type === void 0) {
      type = 'dom';
    }
    if (transformObject === void 0) {
      transformObject = null;
    }
    if (props === void 0) {
      props = new _props__WEBPACK_IMPORTED_MODULE_0__["default"]();
    }
    if (path === void 0) {
      path = null;
    }
    if (id === void 0) {
      id = null;
    }
    if (label === void 0) {
      label = null;
    }
    _this = _Emitter.call(this) || this;
    /**
     * Timeline type.
     * Can be "dom" or "object"
     *
     * @type {string}
     */
    _this.type = 'dom';
    /**
     * Object to apply transforms on.
     * If type is "dom" it refers to a HTMLElement else a plain javascript object
     *
     * @type {HTMLElement|Object}
     */
    _this._transformObject = null;
    /**
     * Defined label representing this timeline node.
     *
     * @type {string|null}
     */
    _this.label = null;
    /**
     * XPath of element, normalized by group element.
     * Only relevant if type is "dom"
     *
     * @type {string|null}
     */
    _this.path = null;
    /**
     * Identifier to select element. Override the path for resolving transformObject.
     * By default the id is set on element attribute [data-spirit-id].
     *
     * @type {string|null}
     */
    _this.id = null;
    /**
     * Properties for this timeline.
     *
     * @type {Props}
     */
    _this.props = null;
    Object.assign(_this, {
      type: type,
      props: props instanceof _props__WEBPACK_IMPORTED_MODULE_0__["default"] ? props : new _props__WEBPACK_IMPORTED_MODULE_0__["default"](props),
      label: label,
      path: path,
      id: id
    });
    _this.transformObject = transformObject;
    return _this;
  }
  _inheritsLoose(Timeline, _Emitter);
  var _proto = Timeline.prototype;
  _proto.validate = function validate() {
    if (this.type === 'dom' && _utils__WEBPACK_IMPORTED_MODULE_1__.context.isBrowser() && this.transformObject && !(this.transformObject instanceof window.Element)) {
      throw new Error('transformObject needs to be an element');
    }
    if (this.type === 'object' && this.transformObject && !_utils__WEBPACK_IMPORTED_MODULE_1__.is.isObject(this.transformObject)) {
      throw new Error('transformObject needs to be an object');
    }
  };
  _proto.toObject = function toObject(ignoreEval) {
    if (ignoreEval === void 0) {
      ignoreEval = false;
    }
    var obj = {
      type: this.type,
      transformObject: this.transformObject,
      props: this.props.toObject(ignoreEval),
      label: this.label,
      path: this.path,
      id: this.id
    };
    Object.keys(obj).forEach(function (key) {
      if (!obj[key]) {
        delete obj[key];
      }
    });
    return obj;
  };
  _proto.destroy = function destroy() {
    if (this.props instanceof _props__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      this.props.each(function (tr) {
        return tr.destroy();
      });
    }
  };
  return _createClass(Timeline, [{
    key: "transformObject",
    get: function get() {
      return this._transformObject;
    },
    set: function set(transformObject) {
      this._transformObject = transformObject;
      this.validate();
      if (transformObject && this.props instanceof _props__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        var thisMapper = this.props.mappings.find(function (mapping) {
          return String(mapping.regex) === '/this/g';
        });
        thisMapper ? thisMapper.map = transformObject : this.props.mappings.push(new _evalmap__WEBPACK_IMPORTED_MODULE_4__["default"](/this/g, transformObject));
        this.props.mappings = [].concat(this.props.mappings);
      }
      if (this.type === 'dom' && transformObject instanceof window.Element) {
        if (!this._style) this._style = transformObject.getAttribute('style');
        if (!this._transform) {
          this._transform = transformObject.getAttribute('transform');
          transformObject.removeAttribute('transform');
        }
      }
    }
  }]);
}(_utils_events__WEBPACK_IMPORTED_MODULE_3__.Emitter), (_applyDecoratedDescriptor(_class.prototype, "transformObject", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "transformObject"), _class.prototype)), _class));
Timeline.fromObject = function (obj) {
  if (!_utils__WEBPACK_IMPORTED_MODULE_1__.is.isObject(obj)) {
    throw new Error('Object is invalid.');
  }
  var args = _utils__WEBPACK_IMPORTED_MODULE_1__.convert.objectToArray(obj).filter(function (arg) {
    return arg !== undefined;
  });
  args = _objectSpread({
    type: args.type || 'dom',
    props: {}
  }, _utils__WEBPACK_IMPORTED_MODULE_1__.convert.arrayToObject(args));
  return new Timeline(args.type, args.transformObject, args.props, args.path || undefined, args.id || undefined, args.label || undefined);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timeline);

/***/ }),

/***/ "./src/group/timelines.js":
/*!********************************!*\
  !*** ./src/group/timelines.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline */ "./src/group/timeline.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Timelines = /*#__PURE__*/function (_List) {
  /**
   * Create timelines instance.
   *
   * @param {Array} timelines
   */
  function Timelines(timelines) {
    if (timelines === void 0) {
      timelines = [];
    }
    return _List.call(this, timelines, _timeline__WEBPACK_IMPORTED_MODULE_1__["default"], ['object', {}]) || this;
  }

  /**
   * Get timeline by transformObject
   *
   * @param   {HTMLElement|object} transformObject
   * @returns {Timeline}
   */
  _inheritsLoose(Timelines, _List);
  var _proto = Timelines.prototype;
  _proto.get = function get(transformObject) {
    return this._list.find(function (tl) {
      return tl.transformObject === transformObject;
    });
  };
  return Timelines;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timelines);

/***/ }),

/***/ "./src/list/list.js":
/*!**************************!*\
  !*** ./src/list/list.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is */ "./src/utils/is.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }



/**
 * List
 *
 * @fires List#add
 * @fires List#remove
 * @fires List#change:list
 */
var List = /*#__PURE__*/function (_Emitter) {
  /**
   * Create List
   *
   * @param {Array}           items
   * @param {*}               model
   * @param {Array|undefined} defaultModelArgs
   */
  function List(items, model, defaultModelArgs) {
    var _this;
    if (items === void 0) {
      items = [];
    }
    if (model === void 0) {
      model = null;
    }
    if (defaultModelArgs === void 0) {
      defaultModelArgs = undefined;
    }
    _this = _Emitter.call(this) || this;
    _this._list = [];
    _this._model = null;
    _this._duplicates = true;
    _this._sortOn = false;
    _this._linkedList = false;
    _this._model = model;
    if (model) {
      var testProto = defaultModelArgs !== undefined ? _construct(model, defaultModelArgs) // eslint-disable-line new-cap
      : new model(); // eslint-disable-line new-cap

      if (typeof testProto.toObject !== 'function') {
        throw new Error('Invalid Model prototype. model.toObject does not exist.');
      }
    }
    if (!Array.isArray(items)) {
      throw new Error('Items should be an array');
    }

    // parse initial list
    _this._list = items.reduce(function (list, item) {
      if (_this._model) {
        if (item instanceof _this._model) {
          item._list = _this;
          if (item.setupBubbleEvents && typeof item.setupBubbleEvents === 'function') {
            item.setupBubbleEvents();
          }
          list.push(item);
        } else {
          if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isObject(item) && typeof model.fromObject === 'function') {
            var itemFromModel = model.fromObject(item);
            itemFromModel._list = _this;
            if (itemFromModel.setupBubbleEvents && typeof itemFromModel.setupBubbleEvents === 'function') {
              itemFromModel.setupBubbleEvents();
            }
            list.push(itemFromModel);
          } else {
            throw new Error('Could not parse item from model');
          }
        }
      } else {
        list.push(item);
      }
      return list;
    }, []);
    return _this;
  }

  /**
   * Get list to allow duplicates
   *
   * @returns {boolean|object}
   */
  _inheritsLoose(List, _Emitter);
  var _proto = List.prototype;
  /**
   * Check current list on duplicates
   */
  _proto.checkOnDuplicates = function checkOnDuplicates() {
    var dup = this._duplicates;
    var uniq = false;
    var isProp = false;

    // check based on boolean
    if (typeof dup === 'boolean' && dup === false) {
      uniq = this.list.map(function (item) {
        return {
          count: 1,
          item: item
        };
      }).reduce(function (a, b) {
        a[b.item] = (a[b.item] || 0) + b.count;
        return a;
      }, {});
    }

    // check based on object property
    if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isObject(dup) && dup.hasOwnProperty('prop')) {
      isProp = true;
      uniq = this.list.map(function (item) {
        return {
          count: 1,
          prop: item[dup.prop]
        };
      }).reduce(function (a, b) {
        a[b.prop] = (a[b.prop] || 0) + b.count;
        return a;
      }, {});
    }
    if (uniq && Object.keys(uniq).filter(function (a) {
      return uniq[a] > 1;
    }).length > 0) {
      var prop = Object.keys(uniq).find(function (p) {
        return uniq[p] > 1;
      });
      var p = isProp ? dup.prop + ": " + prop : false;
      var m = this._model ? this.constructor.name + " > " + this._model.name + " > { " + p + " }" : false;
      throw new Error("List has duplicates. " + m);
    }
  }

  /**
   * Get the sort type of this list
   *
   * @returns {boolean|string}
   */;
  /**
   * Sort list based on sort type
   */
  _proto.sort = function sort() {
    var so = this._sortOn;

    // sort on primitives
    if (typeof so === 'boolean' && so === true) {
      this._list = this._list.sort();
    }

    // sort on property
    if (typeof so === 'string') {
      this._list = this._list.sort(function (a, b) {
        var valA = a[so];
        var valB = b[so];
        if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isNumeric(valA)) {
          return valA - valB;
        }
        String(valA).localeCompare(String(valB));
      });
    }

    // sort on function
    if (typeof so === 'function') {
      this._list = this._list.sort(so);
    }
  }

  /**
   * Is current list linked?
   *
   * @returns {boolean}
   */;
  /**
   * Link items to each other as a linked list based on sortOn
   * if this list is setup as a linked list
   */
  _proto.linkItems = function linkItems() {
    if (this._linkedList) {
      for (var i = 0; i < this._list.length; i++) {
        if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isObject(this._list[i])) {
          this._list[i]._prev = i > 0 ? this._list[i - 1] : null;
          this._list[i]._next = i < this._list.length - 1 ? this._list[i + 1] : null;
        } else {
          throw new Error('Can not link primitives.');
        }
      }
    }
  }

  /**
   * Get the list
   *
   * @returns {Array}
   */;
  /**
   * Get the value at index
   *
   * @param   {number} index
   * @returns {*}
   */
  _proto.at = function at(index) {
    if (index >= this._list.length) {
      throw new Error("Index exceeded. Requested " + index + ", have length of " + this.length);
    }
    return this._list[index];
  }

  /**
   * Add item to list
   *
   * @param   {*|Array} item
   * @fires   List#add
   * @returns {*}
   */;
  _proto.add = function add(item) {
    var _this2 = this;
    var result = null;
    var addSingle = function addSingle(i) {
      var newItem;
      if (_this2._model) {
        if (i instanceof _this2._model) {
          newItem = i;
          newItem._list = _this2;
          if (newItem.setupBubbleEvents && typeof newItem.setupBubbleEvents === 'function') {
            newItem.setupBubbleEvents();
          }
        } else if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isObject(i) && typeof _this2._model.fromObject === 'function') {
          newItem = _this2._model.fromObject(i);
          newItem._list = _this2;
          if (newItem.setupBubbleEvents && typeof newItem.setupBubbleEvents === 'function') {
            newItem.setupBubbleEvents();
          }
        } else {
          throw new Error('Invalid item.');
        }
      } else {
        newItem = i;
      }
      Array.isArray(result) ? result.push(newItem) : result = newItem;
      _this2._list.push(newItem);

      /**
       * List event.
       *
       * @event List#add
       * @type {*}
       */
      _this2.emit('add', newItem);
    };
    if (Array.isArray(item)) {
      result = [];
      item.forEach(addSingle);
    } else {
      addSingle(item);
    }
    this.checkOnDuplicates();
    this.sort();
    this.linkItems();
    return result;
  }

  /**
   * Remove item from list
   *
   * @fires List#remove
   * @param {*|Array} item
   */;
  _proto.remove = function remove(item) {
    var _this3 = this;
    var result = null;
    var removeSingle = function removeSingle(i) {
      var doRemove = function doRemove(ins) {
        var index = _this3._list.indexOf(ins);
        if (index > -1) {
          _this3._list.splice(index, 1);
          if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isObject(ins)) {
            if ('_prev' in ins) {
              delete ins._prev;
            }
            if ('_next' in ins) {
              delete ins._next;
            }
          }

          /**
           * List event.
           *
           * @event List#remove
           * @type {*}
           */
          _this3.emit('remove', ins);
          if (ins._list && ins._list instanceof List) {
            ins._list = null;
          }
          Array.isArray(result) ? result.push(ins) : result = ins;
        }
      };
      if (_this3._model) {
        if (i instanceof _this3._model) {
          doRemove(i);
        }
      } else {
        doRemove(i);
      }
    };
    if (Array.isArray(item)) {
      result = [];
      item.forEach(removeSingle);
    } else {
      removeSingle(item);
    }
    this.sort();
    this.linkItems();
    return result;
  }

  /**
   * Clear the list
   */;
  _proto.clear = function clear() {
    this.each(this.remove.bind(this));
  }

  /**
   * Walk over each item
   *
   * @returns {*}
   */;
  _proto.each = function each(cb) {
    var list = [].concat(this.list);
    var mapped = [];
    var error = false;
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      try {
        mapped.push(cb(item, i));
      } catch (err) {
        error = err;
      }
      if (error) {
        break;
      }
    }
    if (error) {
      throw error;
    }
    return mapped;
  }

  /**
   * Get an object representation of this list
   *
   * @returns {Array}
   */;
  _proto.toArray = function toArray() {
    var l = this._model ? this.list.map(function (item) {
      return item.toObject();
    }) : this.list;
    return l.reduce(function (a, b) {
      if (_utils_is__WEBPACK_IMPORTED_MODULE_0__.isObject(b)) {
        var obj = _objectSpread({}, b);
        delete obj._prev;
        delete obj._next;
        delete obj._list;
        a.push(obj);
      } else {
        a.push(b);
      }
      return a;
    }, []);
  };
  return _createClass(List, [{
    key: "duplicates",
    get: function get() {
      return this._duplicates;
    }

    /**
     * Set list to allow duplicates
     *
     * @param {boolean|object} dup
     *
     * When dup is an object it can check on a property
     * @example { prop: 'id' }
     */,
    set: function set(dup) {
      this._duplicates = dup;
      this.checkOnDuplicates();
    }
  }, {
    key: "sortOn",
    get: function get() {
      return this._sortOn;
    }

    /**
     * Set the sort type of this list
     *
     * @param {boolean|string} sortType
     */,
    set: function set(sortType) {
      this._sortOn = sortType;
      this.sort();
    }
  }, {
    key: "linkedList",
    get: function get() {
      return this._linkedList;
    }

    /**
     * Set current list as a linked list
     *
     * @param {boolean} linked
     */,
    set: function set(linked) {
      this._linkedList = linked;
      this.linkItems();
    }
  }, {
    key: "list",
    get: function get() {
      return this._list;
    }

    /**
     * Reset the list
     *
     * @param {Array} l
     * @fires List#change:list
     */,
    set: function set(l) {
      if (!Array.isArray(l)) {
        throw new Error('List should be an array');
      }
      this._list = l;
      if (this._linkedList) {
        this.linkItems();
      }

      /**
       * List event.
       *
       * @event List#change:list
       * @type {Array}
       */
      this.emit('change:list', l);
    }

    /**
     * Get the length of list
     *
     * @returns {Number}
     */
  }, {
    key: "length",
    get: function get() {
      return this.list.length;
    }
  }]);
}(_utils_events__WEBPACK_IMPORTED_MODULE_1__.Emitter);
List.Events = ['change:list', 'add', 'remove'];
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (List);

/***/ }),

/***/ "./src/loadAnimation.js":
/*!******************************!*\
  !*** ./src/loadAnimation.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config_setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/setup */ "./src/config/setup.js");
/* harmony import */ var _data_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/parser */ "./src/data/parser.js");
/* harmony import */ var _utils_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/is */ "./src/utils/is.js");
/* harmony import */ var _registry_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registry/registry */ "./src/registry/registry.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }




var defaults = {
  loop: false,
  autoPlay: true,
  yoyo: false,
  delay: 0,
  timeScale: false
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
  if (!((0,_utils_is__WEBPACK_IMPORTED_MODULE_2__.isObject)(data) || Array.isArray(data))) {
    return Promise.reject(new Error('Invalid animation data'));
  }
  return Promise.resolve((0,_data_parser__WEBPACK_IMPORTED_MODULE_1__.create)(data, container));
}

/**
 * Load from path
 *
 * @param {string}  path
 * @param {Element} container
 * @return {Promise<Array|object>}
 */
function loadFromPath(path, container) {
  if (path && typeof path === 'string' && path.length > 0) return (0,_data_parser__WEBPACK_IMPORTED_MODULE_1__.load)(path, container);
  return Promise.resolve([]);
}

/**
 * Load animation shorthand
 *
 * @param  {object} manifest
 * @return {Promise<Array|Function>}
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(manifest) {
  var options = _objectSpread(_objectSpread({}, defaults), manifest);
  var animationData = options.animationData,
    container = options.container,
    path = options.path;
  if (options.loop === true) {
    options.loop = -1;
  }
  return new Promise(function (resolve, reject) {
    (0,_config_setup__WEBPACK_IMPORTED_MODULE_0__["default"])().then(function () {
      return Promise.all([createFromData(animationData, container), loadFromPath(path, container)]);
    }).then(function (_ref) {
      var created = _ref[0],
        loaded = _ref[1];
      var result = [];
      function add(item) {
        if (Array.isArray(item)) result.push.apply(result, item);else result.push(item);
      }
      add(created);
      add(loaded);
      return result;
    }).then(function (result) {
      var timelines = [];
      var g = {};
      if (result.length === 1 && result[0].length === 1) {
        // single group
        timelines.push(result[0].at(0).construct());
      } else {
        // multi group

        result.forEach(function (groups) {
          groups.each(function (group) {
            g[group.name] = group.construct();
            g[group.name].construct = function () {
              var tl = _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].get(group.name).construct();
              tl.construct = this.construct;
              return tl;
            };
          });
        });
        timelines.push.apply(timelines, Object.keys(g).map(function (k) {
          return g[k];
        }));
      }

      // apply options
      for (var i = 0; i < timelines.length; i++) {
        var timeline = timelines[i];
        if (options.loop) {
          var loopCount = typeof options.loop === 'boolean' ? -1 : options.loop;
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
        resolve(timelines[0]);
      }
      resolve(g);
    })["catch"](reject);
  });
}

/***/ }),

/***/ "./src/registry/registry.js":
/*!**********************************!*\
  !*** ./src/registry/registry.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../group */ "./src/group/index.js");
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }


var Registry = /*#__PURE__*/function (_List) {
  function Registry() {
    return _List.call(this, []) || this;
  }

  /**
   * Add unique group
   *
   * @param {Group} group
   */
  _inheritsLoose(Registry, _List);
  var _proto = Registry.prototype;
  _proto.add = function add(group) {
    if (!(group instanceof _group__WEBPACK_IMPORTED_MODULE_1__.Group)) {
      throw new Error('Invalid group. Only Group instances allowed.');
    }
    _List.prototype.add.call(this, group);
  }

  /**
   * Remove group from registry
   *
   * @param   {Group} group
   * @returns {Group}
   */;
  _proto.remove = function remove(group) {
    group.reset();
    return _List.prototype.remove.call(this, group);
  }

  /**
   * Get group by name
   *
   * @param   {string} name
   * @returns {Group}
   */;
  _proto.get = function get(name) {
    return this.list.find(function (g) {
      return g.name === name;
    });
  }

  /**
   * Get all group names from registry
   *
   * @returns {Array}
   */;
  _proto.groupNames = function groupNames() {
    return this.list.map(function (g) {
      return g.name;
    });
  };
  return Registry;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new Registry());

/***/ }),

/***/ "./src/utils/autobind.js":
/*!*******************************!*\
  !*** ./src/utils/autobind.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfill */ "./src/utils/polyfill.js");

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return arguments.length === 1 ? boundClass.apply(void 0, arguments) : boundMethod.apply(void 0, arguments);
}
var ignoreMethods = ['constructor'];
function boundClass(target) {
  var keys = Object.getOwnPropertyNames(target.prototype);
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
  }
  keys.forEach(function (key) {
    if ((0,_polyfill__WEBPACK_IMPORTED_MODULE_0__.includes)(ignoreMethods, key)) {
      return;
    }
    var descriptor = Object.getOwnPropertyDescriptor(target.prototype, key);
    if (typeof descriptor.value === 'function') {
      Object.defineProperty(target.prototype, key, boundMethod(target, key, descriptor));
    }
  });
  return target;
}
function boundMethod(target, key, descriptor) {
  var fn = descriptor.value;
  if (typeof fn !== 'function') {
    throw new Error("@autobind decorator can only be applied to methods not: " + typeof fn);
  }
  return {
    configurable: true,
    get: function get() {
      if (this === target.prototype || this.hasOwnProperty(key)) {
        return fn;
      }
      var boundFn = fn.bind(this);
      Object.defineProperty(this, key, {
        value: boundFn,
        configurable: true,
        writable: true
      });
      return boundFn;
    },
    set: function set() {
      return fn;
    }
  };
}

/***/ }),

/***/ "./src/utils/context.js":
/*!******************************!*\
  !*** ./src/utils/context.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isBrowser: () => (/* binding */ isBrowser)
/* harmony export */ });
function isBrowser() {
  return typeof window === 'object' && typeof document === 'object';
}

/***/ }),

/***/ "./src/utils/convert.js":
/*!******************************!*\
  !*** ./src/utils/convert.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayToObject: () => (/* binding */ arrayToObject),
/* harmony export */   objectToArray: () => (/* binding */ objectToArray)
/* harmony export */ });
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Convert object to array
 *
 * @param   {object} obj
 * @returns {Array}
 */
function objectToArray(obj) {
  return Object.keys(obj).reduce(function (a, b) {
    var _a$push;
    a.push((_a$push = {}, _a$push[b] = obj[b], _a$push));
    return a;
  }, []);
}

/**
 * Convert array to object
 *
 * @param   {Array} arr
 * @returns {object}
 */
function arrayToObject(arr) {
  return arr.reduce(function (a, b) {
    a = _objectSpread(_objectSpread({}, a), b);
    return a;
  }, {});
}

/***/ }),

/***/ "./src/utils/debug.js":
/*!****************************!*\
  !*** ./src/utils/debug.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");


var debug = function debug() {
  return (0,_context__WEBPACK_IMPORTED_MODULE_0__.isBrowser)() && Boolean(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].debug);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (debug);

/***/ }),

/***/ "./src/utils/emitter.js":
/*!******************************!*\
  !*** ./src/utils/emitter.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   emitChange: () => (/* binding */ emitChange)
/* harmony export */ });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/utils/events.js");
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * -------------------------------------------
 * Decorator for emitting changes
 * -------------------------------------------
 *
 * @example on setter:
 *
 *    class Item {
 *
 *      _label = null
 *      _list = new List()
 *
 *      get label() {
 *        return this._label
 *      }
 *
 *      @emitChange()
 *      set label(val) {
 *        this._label = val
 *      }
 *
 *    }
 *
 * @example on class:
 *
 *    @emitChange('album')
 *    @emitChange('label', 'untitled', [
 *      {
 *        validator: v => /\d+/.test(v),
 *        message: 'Not a number'
 *      },
 *      {
 *        validator = v => typeof v === 'string',
 *        message: 'Must be a string'
 *      }
 *    ])
 *
 *    class Song {
 *
 *    }
 */





/**
 * Setter deco
 *
 * @param   {Emitter}  target
 * @param   {string}   key
 * @param   {object}   descriptor
 * @returns {object}
 */
var setter = function setter(target, key, descriptor) {
  var fn = descriptor.set;
  if (!_events__WEBPACK_IMPORTED_MODULE_0__.Emitter.prototype.isPrototypeOf(target) && !_events__WEBPACK_IMPORTED_MODULE_0__.Emitter.prototype.isPrototypeOf(target.prototype)) {
    throw new Error('@emitter.emitChange can only be applied to event emitters');
  }
  return _objectSpread(_objectSpread({}, descriptor), {}, {
    configurable: true,
    set: function set(val) {
      var _this = this;
      var toObj = function toObj(v) {
        var _ref;
        return (0,_is__WEBPACK_IMPORTED_MODULE_2__.isFunction)(_this.toObject) ? _this.toObject() : (_ref = {}, _ref[key] = v !== undefined ? v : val, _ref);
      };

      // get previous value
      var prev = this['_' + key];
      if (prev && typeof prev.toArray === 'function') {
        prev = prev.toArray();
      } else if (prev && typeof prev.toObject === 'function') {
        prev = prev.toObject();
      }
      var previous;
      if (prev !== val) {
        previous = toObj(prev);
      }

      // call class setter method
      fn.call(this, val);

      // is a duplicate on list?
      if (this._list instanceof _list_list__WEBPACK_IMPORTED_MODULE_1__["default"] && this._list._duplicates !== true) {
        try {
          this._list.checkOnDuplicates();
        } catch (err) {
          fn.call(this, prev);
          throw err;
        }
      }

      // only emit changes
      if (prev === val) {
        return;
      }
      var from = prev && (0,_is__WEBPACK_IMPORTED_MODULE_2__.isFunction)(prev.toObject) ? prev.toObject() : prev;
      var to = val && (0,_is__WEBPACK_IMPORTED_MODULE_2__.isFunction)(val.toObject) ? val.toObject() : val;
      var changed = {
        type: key,
        from: from,
        to: to
      };
      var current;
      try {
        current = toObj();
      } catch (err) {
        var _current;
        current = (_current = {}, _current[key] = val, _current);
      }
      var evtParams = {
        previous: previous,
        current: current,
        changed: changed
      };
      var evtChange = ['change', evtParams];
      var evtChangeProp = ["change:" + key, evtParams, val];
      this.emit.apply(this, evtChange);
      this.emit.apply(this, evtChangeProp);
      if (this._list && this._list instanceof _events__WEBPACK_IMPORTED_MODULE_0__.Emitter) {
        var _this$_list, _this$_list2;
        (_this$_list = this._list).emit.apply(_this$_list, evtChange);
        (_this$_list2 = this._list).emit.apply(_this$_list2, evtChangeProp);
      }
    }
  });
};

/**
 * Decorator
 *
 * @param {string}  prop          (apply on classes)
 * @param {*}       defaultValue  (optional, default=null)
 * @param {Array}   validators    (optional)
 */
function emitChange(prop, defaultValue, validators) {
  if (prop === void 0) {
    prop = null;
  }
  if (defaultValue === void 0) {
    defaultValue = null;
  }
  if (validators === void 0) {
    validators = [];
  }
  if (prop) {
    // bind as class
    return function (target) {
      var _Object$definePropert;
      // setup class prototype
      Object.defineProperties(target.prototype, (_Object$definePropert = {}, _Object$definePropert["_" + prop] = {
        value: defaultValue,
        writable: true,
        enumerable: false,
        configurable: true
      }, _Object$definePropert[prop] = {
        configurable: true,
        get: function get() {
          return this["_" + prop];
        },
        set: function set(val) {
          var errors = validators.reduce(function (res, v) {
            if (!v.validator(val)) {
              res.push(v.message);
            }
            return res;
          }, []);
          if (errors.length > 0) {
            throw new Error("" + errors[0]);
          }
          this["_" + prop] = val;
        }
      }, _Object$definePropert));

      // apply setter on it
      var descriptor = Object.getOwnPropertyDescriptor(target.prototype, prop);
      Object.defineProperty(target.prototype, prop, setter(target, prop, descriptor));
    };
  }

  // bind as setter
  return setter;
}

/***/ }),

/***/ "./src/utils/errors.js":
/*!*****************************!*\
  !*** ./src/utils/errors.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TimelineError: () => (/* binding */ TimelineError)
/* harmony export */ });
function _inheritsLoose(t, o) { t.prototype = Object.create(o.prototype), t.prototype.constructor = t, _setPrototypeOf(t, o); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
var TimelineError = /*#__PURE__*/function (_Error) {
  function TimelineError(message, transformObject, stack) {
    var _this;
    if (stack === void 0) {
      stack = null;
    }
    _this = _Error.call(this, message) || this;
    _this.transformObject = null;
    if (stack) {
      _this.stack = stack;
    } else {
      Error.captureStackTrace(_this, TimelineError);
    }
    _this.transformObject = transformObject;
    _this.name = 'TimelineError';
    _this.message = message;
    return _this;
  }
  _inheritsLoose(TimelineError, _Error);
  return TimelineError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/utils/events.js":
/*!*****************************!*\
  !*** ./src/utils/events.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Emitter: () => (/* binding */ Emitter),
/* harmony export */   bubbleEvent: () => (/* binding */ bubbleEvent),
/* harmony export */   createEventObjectForModel: () => (/* binding */ createEventObjectForModel)
/* harmony export */ });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.mjs");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/**
 * Bubble events.
 *
 * @param   {string}  evt
 * @param   {*}       scope event emitter
 * @returns {function}
 */
function bubbleEvent(evt, scope) {
  if (!(scope instanceof Emitter)) {
    throw new Error('Scope needs to be an emitter.');
  }
  return function () {
    this.emit.apply(this, [evt].concat(Array.prototype.slice.call(arguments)));
    if (this._list instanceof _list_list__WEBPACK_IMPORTED_MODULE_0__["default"]) {
      var _this$_list;
      (_this$_list = this._list).emit.apply(_this$_list, [evt].concat(Array.prototype.slice.call(arguments)));
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
function createEventObjectForModel(model, obj, prop, prevVal, nextVal) {
  var _objectSpread2;
  /**
   * Event object.
   *
   * @type {object}
   * @property {object} prevModel - param before change
   * @property {object} model - param after change
   * @property {object} changed - {type, from, to}
   */
  var evt = {
    prevModel: model.fromObject(obj),
    model: model.fromObject(_objectSpread(_objectSpread({}, obj), {}, (_objectSpread2 = {}, _objectSpread2[prop] = nextVal, _objectSpread2))),
    changed: {
      type: prop,
      from: prevVal,
      to: nextVal
    }
  };
  return evt;
}

/**
 * Minimal event emitter
 */
var Emitter = /*#__PURE__*/function () {
  function Emitter() {
    this._emitter = (0,mitt__WEBPACK_IMPORTED_MODULE_1__["default"])();
  }
  var _proto = Emitter.prototype;
  _proto.emit = function emit(eventName) {
    var _this$_emitter;
    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }
    (_this$_emitter = this._emitter).emit.apply(_this$_emitter, [eventName].concat(args));
  };
  _proto.on = function on(event, listener) {
    this._emitter.on(event, listener);
  };
  _proto.removeListener = function removeListener(event, listener) {
    this._emitter.off(event, listener);
  };
  _proto.removeAllListeners = function removeAllListeners() {
    this._emitter.all.clear();
  };
  return Emitter;
}();

/***/ }),

/***/ "./src/utils/gsap.js":
/*!***************************!*\
  !*** ./src/utils/gsap.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensure: () => (/* binding */ ensure),
/* harmony export */   generateTimeline: () => (/* binding */ generateTimeline),
/* harmony export */   has: () => (/* binding */ has),
/* harmony export */   isGSAPInstance: () => (/* binding */ isGSAPInstance),
/* harmony export */   isGSAPTimeline: () => (/* binding */ isGSAPTimeline),
/* harmony export */   killTimeline: () => (/* binding */ killTimeline),
/* harmony export */   loadFromCDN: () => (/* binding */ loadFromCDN),
/* harmony export */   transformOrigins: () => (/* binding */ transformOrigins)
/* harmony export */ });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");
/* harmony import */ var _loadscript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadscript */ "./src/utils/loadscript.js");
/* harmony import */ var _group_timeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../group/timeline */ "./src/group/timeline.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");
function _createForOfIteratorHelperLoose(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (t) return (t = t.call(r)).next.bind(t); if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var o = 0; return function () { return o >= r.length ? { done: !0 } : { done: !1, value: r[o++] }; }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







/**
 * Check on GSAP presence
 *
 * @returns {boolean}
 */
function has() {
  return isGSAPInstance(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance);
}

/**
 * Ensure GSAP is loaded
 * Auto inject
 *
 * @returns {Promise<void>}
 */
function ensure() {
  if (has()) {
    return Promise.resolve();
  }
  if ((0,_context__WEBPACK_IMPORTED_MODULE_5__.isBrowser)() && isGSAPInstance(window.gsap)) {
    _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance = window.gsap;
    return Promise.resolve();
  }

  // load from cdn
  if (!_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInject) {
    if ((0,_debug__WEBPACK_IMPORTED_MODULE_3__["default"])()) {
      console.warn("\n\n        It seems that you've disabled autoInject. GSAP cannot be found or loaded by Spirit.\n        Please make sure you provide the tween and timeline to Spirit:\n\n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n\n        Or enable the autoInject \"spirit.config.gsap.autoInject = true\".\n\n      ");
    }
    return Promise.reject(new Error('GSAP not found.'));
  }
  if ((0,_debug__WEBPACK_IMPORTED_MODULE_3__["default"])()) {
    console.warn("\n\n      GSAP is being fetched from CDN: " + _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInjectUrl + ".\n      If you already have GSAP installed, please provide it to Spirit:\n\n        spirit.setup(gsap)\n\n      You want to use another cdn? Change it here:\n\n        spirit.config.gsap.autoInjectUrl = 'https://cdn.xxx'\n\n    ");
  }
  return this.loadFromCDN();
}

/**
 * Load GSAP from CDN based on autoInjectUrl
 *
 * @return {Promise<void>}
 */
function loadFromCDN() {
  return (0,_loadscript__WEBPACK_IMPORTED_MODULE_1__["default"])(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInjectUrl).then(function () {
    if (!isGSAPInstance(window.gsap)) {
      return Promise.reject(new Error('GSAP could not be loaded from CDN: ' + _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInjectUrl));
    }
    _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance = window.gsap;
    return Promise.resolve();
  })["catch"](function (err) {
    return Promise.reject(err);
  });
}

/**
 * Get transform origins for timeline
 *
 * @param {Timeline} timeline
 * @return {Function}
 */
function transformOrigins(timeline) {
  var prop = timeline.props.get('transformOrigin');
  var origins = prop && prop.keyframes.list.map(function (k) {
    return {
      time: k.time,
      value: k.value
    };
  }) || [];

  // add start 50% 50% ?
  if (origins.length > 0 && origins[0].time !== 0 || origins.length === 0) {
    origins.unshift({
      time: 0,
      value: '50% 50%'
    });
  }
  var current = origins.shift();
  var next, getVal;
  getVal = function getVal() {
    return {
      current: current,
      next: next
    };
  };
  next = function next() {
    current = origins && origins.length > 0 && origins.shift() || null;
    return getVal();
  };
  return getVal();
}

/**
 * Generate timeline from data
 *
 * @param {Timeline} timeline
 * @returns {TimelineMax|TimelineLite}
 */
function generateTimeline(timeline) {
  if (!timeline || !(timeline instanceof _group_timeline__WEBPACK_IMPORTED_MODULE_2__["default"])) {
    throw new Error('Need valid timeline data to generate GSAP timeline from');
  }
  if (timeline.type !== 'dom') {
    throw new Error('Timeline invalid. Needs a timeline with type of dom.');
  }
  if (!has()) {
    throw new Error('GSAP not set. Please make sure GSAP is available.');
  }

  // create new timeline
  var tl = _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance.timeline({
    paused: true
  }); // eslint-disable-line new-cap

  var origins = transformOrigins(timeline);
  var origin = origins.current;
  timeline.props.each(function (prop) {
    if (prop.keyframes.length === 0 || prop.name === 'transformOrigin' || prop.name === 'svgOrigin') {
      return;
    }
    var keyframe = prop.keyframes.at(0);
    while (keyframe) {
      var _property;
      var _keyframe = keyframe,
        value = _keyframe.value,
        ease = _keyframe.ease,
        time = _keyframe.time;
      var prev = keyframe.prev();
      var start = prev ? prev.time : 0;
      var duration = prev ? time - prev.time : time;
      var props = {
        ease: ease || 'none'
      };
      var property = (_property = {}, _property[prop.name] = value, _property);

      // parse dots into recursive object
      if (/\./.test(prop.name)) {
        var segments = prop.name.split('.');
        var last = segments.pop();
        var obj = {};
        var o = obj;
        while (segments.length > 0) {
          var segment = segments.shift();
          obj[segment] = {};
          obj = obj[segment];
        }
        obj[last] = value;
        property = o;
      }
      props = _objectSpread(_objectSpread(_objectSpread({}, props), property), {}, {
        duration: duration
      });
      if (time === 0) {
        props.immediateRender = true;
      }
      if (prop.isCSSTransform() && origin && time >= origin.time) {
        props.transformOrigin = origin.value;
        origin = origins.next().current;
      }
      tl.to(timeline.transformObject, props, start);
      keyframe = keyframe.next();
    }
  });
  return tl;
}

/**
 * Recursively kill timeline
 * Reset props on targets
 *
 * @param {TimelineMax|TimelineLite} gsapTimeline
 */
function killTimeline(gsapTimeline) {
  if (isGSAPTimeline(gsapTimeline)) {
    if (gsapTimeline.eventCallback) {
      gsapTimeline.eventCallback('onComplete', null);
      gsapTimeline.eventCallback('onUpdate', null);
      gsapTimeline.eventCallback('onStart', null);
      gsapTimeline.eventCallback('onReverseComplete', null);
      gsapTimeline.eventCallback('onRepeat', null);
    }
    var targets = gsapTimeline.getChildren ? gsapTimeline.getChildren() : [];
    gsapTimeline.kill();
    for (var i = 0; i < targets.length; i++) {
      if (targets[i]._targets) {
        for (var _iterator = _createForOfIteratorHelperLoose(targets[i]._targets), _step; !(_step = _iterator()).done;) {
          var el = _step.value;
          _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance.set(el, {
            clearProps: 'all'
          });
          delete el._gsap;
        }
      }
      if (isGSAPTimeline(targets[i])) {
        killTimeline(targets[i]);
      }
    }
    if (gsapTimeline.clear) {
      gsapTimeline.clear();
    }
  }
  return gsapTimeline;
}
function isGSAPTimeline(timeline) {
  return timeline && _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance && timeline instanceof _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.instance.core.Animation;
}
function isGSAPInstance(n) {
  return (0,_is__WEBPACK_IMPORTED_MODULE_4__.isObject)(n) && (0,_is__WEBPACK_IMPORTED_MODULE_4__.isFunction)(n.to) && (0,_is__WEBPACK_IMPORTED_MODULE_4__.isFunction)(n.timeline);
}

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   autobind: () => (/* reexport safe */ _autobind__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   context: () => (/* reexport module object */ _context__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   convert: () => (/* reexport module object */ _convert__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   debug: () => (/* reexport safe */ _debug__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   emitter: () => (/* reexport module object */ _emitter__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   events: () => (/* reexport module object */ _events__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   gsap: () => (/* reexport module object */ _gsap__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   is: () => (/* reexport module object */ _is__WEBPACK_IMPORTED_MODULE_5__),
/* harmony export */   jsonloader: () => (/* reexport safe */ _jsonloader__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   loadscript: () => (/* reexport safe */ _loadscript__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   resolver: () => (/* reexport module object */ _resolver__WEBPACK_IMPORTED_MODULE_7__),
/* harmony export */   xpath: () => (/* reexport module object */ _xpath__WEBPACK_IMPORTED_MODULE_4__)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");
/* harmony import */ var _gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gsap */ "./src/utils/gsap.js");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./src/utils/events.js");
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./convert */ "./src/utils/convert.js");
/* harmony import */ var _xpath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./xpath */ "./src/utils/xpath.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./emitter */ "./src/utils/emitter.js");
/* harmony import */ var _resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resolver */ "./src/utils/resolver.js");
/* harmony import */ var _loadscript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loadscript */ "./src/utils/loadscript.js");
/* harmony import */ var _jsonloader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jsonloader */ "./src/utils/jsonloader.js");
/* harmony import */ var _autobind__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./autobind */ "./src/utils/autobind.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");














/***/ }),

/***/ "./src/utils/is.js":
/*!*************************!*\
  !*** ./src/utils/is.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isFunction: () => (/* binding */ isFunction),
/* harmony export */   isNumeric: () => (/* binding */ isNumeric),
/* harmony export */   isObject: () => (/* binding */ isObject),
/* harmony export */   isSVG: () => (/* binding */ isSVG)
/* harmony export */ });
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
function isSVG(element) {
  return element instanceof window.SVGElement;
}
function isFunction(fn) {
  return typeof fn === 'function';
}
function isNumeric(n) {
  return !isNaN(n);
}

/***/ }),

/***/ "./src/utils/jsonloader.js":
/*!*********************************!*\
  !*** ./src/utils/jsonloader.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cache: () => (/* binding */ cache),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   req: () => (/* binding */ req)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");

var req = {};
var cache = {};

/**
 * JSON Loader.
 * Optimize requests by caching results based on url.
 *
 * @param   {string} url
 * @returns {Promise}
 */
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(url) {
  // only run in browser
  if (!(0,_context__WEBPACK_IMPORTED_MODULE_0__.isBrowser)()) {
    return Promise.reject(new Error('Invalid context. jsonLoader can only be used in browser.'));
  }

  // serve from cache
  if (url in cache) {
    return Promise.resolve(cache[url]);
  }

  // serve from queued promise
  if (url in req) {
    return req[url];
  }

  // create promise request
  var promise = new Promise(function (resolve, reject) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        try {
          var result = JSON.parse(this.responseText);
          cache[url] = result;
          resolve(result);
          delete req[url];
        } catch (err) {
          reject(new Error("jsonLoader: Invalid json for request " + url));
        }
      }
    };
    try {
      xmlhttp.open('GET', encodeURI(url), true);
      xmlhttp.send();
    } catch (err) {
      reject(new Error("Could not open request. Unable to load " + url));
    }
  });

  // store request
  if (!req[url]) {
    req[url] = promise;
  }

  // send back the promise
  return promise;
}

/***/ }),

/***/ "./src/utils/loadscript.js":
/*!*********************************!*\
  !*** ./src/utils/loadscript.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ loadScript)
/* harmony export */ });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");


/**
 * Load script into web page context
 * .
 * @param   {string} src script source
 * @returns {Promise}
 */
function loadScript(src) {
  if (!(0,_context__WEBPACK_IMPORTED_MODULE_0__.isBrowser)()) {
    return Promise.reject(new Error("Script can only be loaded in the browser: " + src));
  }
  return new Promise(function (resolve, reject) {
    var s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.onload = function () {
      document.body.removeChild(s);
      resolve();
    };
    s.onerror = function () {
      document.body.removeChild(s);
      reject(new Error("Could not load script " + src));
    };
    document.body.appendChild(s);
  });
}

/***/ }),

/***/ "./src/utils/polyfill.js":
/*!*******************************!*\
  !*** ./src/utils/polyfill.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   includes: () => (/* binding */ includes)
/* harmony export */ });
function includes(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return true;
    }
  }
  return false;
}

/***/ }),

/***/ "./src/utils/resolver.js":
/*!*******************************!*\
  !*** ./src/utils/resolver.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   resolveElement: () => (/* binding */ resolveElement)
/* harmony export */ });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");
/* harmony import */ var _xpath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xpath */ "./src/utils/xpath.js");



/**
 * Resolve element relative to root
 *
 * @param {Element}       root
 * @param {{ path, id }}  data
 * @param {boolean}       throwException
 */
function resolveElement(root, data, throwException) {
  if (throwException === void 0) {
    throwException = false;
  }
  var transformObject = null;
  var path = data.path,
    id = data.id;
  if (id) {
    transformObject = root.querySelector("[data-spirit-id=\"" + id + "\"]");
  }
  if (!transformObject && path) {
    transformObject = _xpath__WEBPACK_IMPORTED_MODULE_1__.getElement(path, root === document.body ? undefined : root);
  }
  if (!transformObject) {
    if ((0,_debug__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
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

/***/ }),

/***/ "./src/utils/xpath.js":
/*!****************************!*\
  !*** ./src/utils/xpath.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getElement: () => (/* binding */ getElement),
/* harmony export */   getExpression: () => (/* binding */ getExpression)
/* harmony export */ });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");



/**
 * Get DOM representation for an element.
 *
 * @param   {Element}              element
 * @param   {null|undefined|Node}  nodeContext
 * @returns {string|null}
 */
function getExpression(element, nodeContext) {
  if (nodeContext === void 0) {
    nodeContext = null;
  }
  var paths = [];
  var isNodeContext = function isNodeContext() {
    if (!nodeContext) {
      return true;
    }
    return nodeContext !== element;
  };
  while (element.nodeType === window.Node.ELEMENT_NODE && isNodeContext()) {
    var index = 0;
    for (var sibling = element.previousSibling; sibling; sibling = sibling.previousSibling) {
      if (sibling.nodeType === window.Node.DOCUMENT_TYPE_NODE) {
        continue;
      }
      if (sibling.nodeName === element.nodeName) {
        ++index;
      }
    }
    var tagName = element.nodeName.toLowerCase();
    var pathIndex = "[" + (index + 1) + "]";
    if ((0,_is__WEBPACK_IMPORTED_MODULE_0__.isSVG)(element)) {
      tagName = "*[local-name()='" + tagName + "']";
    }
    paths.unshift(tagName + pathIndex);
    element = element.parentNode;
  }
  if (paths.length === 0) {
    return null;
  }
  return nodeContext ? paths.join('/') : "/" + paths.join('/');
}

/**
 * Get an element from expression
 *
 * @param   {string} expression
 * @param   {Node}   nodeContext
 * @returns {Node|null}
 */
function getElement(expression, nodeContext) {
  if (nodeContext === void 0) {
    nodeContext = null;
  }
  if (!nodeContext) {
    nodeContext = document.body || document.documentElement;
  }
  try {
    var evaluated = document.evaluate(expression, nodeContext, null, window.XPathResult.ANY_TYPE, null);
    return evaluated.iterateNext();
  } catch (err) {
    if ((0,_debug__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
      console.error('Cannot get element from expression: ', expression);
      console.error(err.stack);
    }
  }
  return null;
}

/***/ }),

/***/ "./node_modules/mitt/dist/mitt.mjs":
/*!*****************************************!*\
  !*** ./node_modules/mitt/dist/mitt.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(n){return{all:n=n||new Map,on:function(t,e){var i=n.get(t);i?i.push(e):n.set(t,[e])},off:function(t,e){var i=n.get(t);i&&(e?i.splice(i.indexOf(e)>>>0,1):n.set(t,[]))},emit:function(t,e){var i=n.get(t);i&&i.slice().map(function(n){n(e)}),(i=n.get("*"))&&i.slice().map(function(n){n(t,e)})}}}
//# sourceMappingURL=mitt.mjs.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it declares 'spirit' on top-level, which conflicts with the current library output.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   config: () => (/* reexport safe */ _config_config__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   create: () => (/* reexport safe */ _data_parser__WEBPACK_IMPORTED_MODULE_4__.create),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   groups: () => (/* reexport safe */ _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   load: () => (/* reexport safe */ _data_parser__WEBPACK_IMPORTED_MODULE_4__.load),
/* harmony export */   loadAnimation: () => (/* reexport safe */ _loadAnimation__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   setup: () => (/* reexport safe */ _config_setup__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   version: () => (/* binding */ version)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/config */ "./src/config/config.js");
/* harmony import */ var _config_setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/setup */ "./src/config/setup.js");
/* harmony import */ var _registry_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registry/registry */ "./src/registry/registry.js");
/* harmony import */ var _data_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/parser */ "./src/data/parser.js");
/* harmony import */ var _loadAnimation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadAnimation */ "./src/loadAnimation.js");
/* harmony import */ var _utils_debug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/debug */ "./src/utils/debug.js");

var version = "3.1.16";







var spirit = {
  config: _config_config__WEBPACK_IMPORTED_MODULE_1__["default"],
  version: version,
  setup: _config_setup__WEBPACK_IMPORTED_MODULE_2__["default"],
  groups: _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"],
  create: _data_parser__WEBPACK_IMPORTED_MODULE_4__.create,
  load: _data_parser__WEBPACK_IMPORTED_MODULE_4__.load,
  loadAnimation: _loadAnimation__WEBPACK_IMPORTED_MODULE_5__["default"]
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (spirit);
if (_utils__WEBPACK_IMPORTED_MODULE_0__.context.isBrowser()) {
  if (window !== undefined) {
    // add to global namespace so Spirit Studio can reach it
    window.spirit = spirit;
  }
  if ((0,_utils_debug__WEBPACK_IMPORTED_MODULE_6__["default"])()) {
    console.warn("You are running the development build of Spirit v" + version + ".");
  }
}
})();

spirit = __webpack_exports__["default"];
/******/ })()
;
//# sourceMappingURL=spirit.js.map