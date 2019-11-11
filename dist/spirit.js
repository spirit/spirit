/*!
 * Spirit.js v2.4.2
 * 
 * (c) 2019 Patrick Brouwer
 * Released under the MIT License.
 */
var spirit =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mitt/dist/mitt.es.js":
/*!*******************************************!*\
  !*** ./node_modules/mitt/dist/mitt.es.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//      
// An event handler can take an optional event argument
// and should not return a value
                                          
                                                               

// An array of all currently registered event handlers for a type
                                            
                                                            
// A map of event types and their corresponding event handlers.
                        
                                 
                                   
  

/** Mitt: Tiny (~200b) functional event emitter / pubsub.
 *  @name mitt
 *  @returns {Mitt}
 */
function mitt(all                 ) {
	all = all || Object.create(null);

	return {
		/**
		 * Register an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to listen for, or `"*"` for all events
		 * @param  {Function} handler Function to call in response to given event
		 * @memberOf mitt
		 */
		on: function on(type        , handler              ) {
			(all[type] || (all[type] = [])).push(handler);
		},

		/**
		 * Remove an event handler for the given type.
		 *
		 * @param  {String} type	Type of event to unregister `handler` from, or `"*"`
		 * @param  {Function} handler Handler function to remove
		 * @memberOf mitt
		 */
		off: function off(type        , handler              ) {
			if (all[type]) {
				all[type].splice(all[type].indexOf(handler) >>> 0, 1);
			}
		},

		/**
		 * Invoke all handlers for the given type.
		 * If present, `"*"` handlers are invoked after type-matched handlers.
		 *
		 * @param {String} type  The event type to invoke
		 * @param {Any} [evt]  Any value (object is recommended and powerful), passed to each handler
		 * @memberOf mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).slice().map(function (handler) { handler(evt); });
			(all['*'] || []).slice().map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ __webpack_exports__["default"] = (mitt);
//# sourceMappingURL=mitt.es.js.map


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/config/config.js":
/*!******************************!*\
  !*** ./src/config/config.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/context */ "./src/utils/context.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Config = function Config() {
  _classCallCheck(this, Config);

  this.debug =  true && Object(_utils_context__WEBPACK_IMPORTED_MODULE_0__["isBrowser"])();
  this.overwriteAnimations = true;
  this.gsap = {
    tween: null,
    timeline: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap@2.1.3/umd/TweenMax.js'
  };
};

/* harmony default export */ __webpack_exports__["default"] = (new Config());

/***/ }),

/***/ "./src/config/setup.js":
/*!*****************************!*\
  !*** ./src/config/setup.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return setup; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config */ "./src/config/config.js");


/**
 * Setup Spirit GSAP
 *
 * @param {object} conf
 */

function setup() {
  var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return new Promise(function (resolve, reject) {
    _utils__WEBPACK_IMPORTED_MODULE_0__["is"].isObject(conf) && Object.keys(conf).forEach(function (k) {
      var obj = _config__WEBPACK_IMPORTED_MODULE_1__["default"].gsap.hasOwnProperty(k) && _utils__WEBPACK_IMPORTED_MODULE_0__["is"].isFunction(conf[k]) ? _config__WEBPACK_IMPORTED_MODULE_1__["default"].gsap : _config__WEBPACK_IMPORTED_MODULE_1__["default"];
      obj[k] = conf[k];
    });
    _utils__WEBPACK_IMPORTED_MODULE_0__["gsap"].ensure().then(resolve)["catch"](reject);
  });
}

/***/ }),

/***/ "./src/data/parser.js":
/*!****************************!*\
  !*** ./src/data/parser.js ***!
  \****************************/
/*! exports provided: create, load */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "create", function() { return create; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "load", function() { return load; });
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
        groups = new _group__WEBPACK_IMPORTED_MODULE_1__["Groups"](root, []);
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


function create(data) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (!_utils__WEBPACK_IMPORTED_MODULE_0__["context"].isBrowser()) {
    throw new Error('Invalid context. spirit.create() can only be executed in the browser.');
  }

  var resolveRoot = false; // ensure root element

  if (!(root instanceof window.Element)) {
    resolveRoot = true;
    root = document.body || document.documentElement;
  }

  if (_utils__WEBPACK_IMPORTED_MODULE_0__["is"].isObject(data) && data['groups'] && Array.isArray(data['groups'])) {
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
      groupRoot = _utils__WEBPACK_IMPORTED_MODULE_0__["resolver"].resolveElement(root, g.root);

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
    factory.add(groupRoot, new _group__WEBPACK_IMPORTED_MODULE_1__["Group"](d));
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

function load(url) {
  var root = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (!_utils__WEBPACK_IMPORTED_MODULE_0__["context"].isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in the browser.'));
  }

  return Object(_utils__WEBPACK_IMPORTED_MODULE_0__["jsonloader"])(url).then(function (data) {
    return create(data, root);
  });
}

/***/ }),

/***/ "./src/group/evalmap.js":
/*!******************************!*\
  !*** ./src/group/evalmap.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EvalMap =
/**
 * Create an evaluable map
 *
 * @param {RegExp}  regex
 * @param {*}       map
 */
function EvalMap(regex, map) {
  _classCallCheck(this, EvalMap);

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

/* harmony default export */ __webpack_exports__["default"] = (EvalMap);

/***/ }),

/***/ "./src/group/group.js":
/*!****************************!*\
  !*** ./src/group/group.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _timelines__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./timelines */ "./src/group/timelines.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/errors */ "./src/utils/errors.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
var _dec, _dec2, _dec3, _dec4, _class, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }







/**
 * Group.
 */

var Group = (_dec = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_3__["emitChange"])(), _dec2 = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_3__["emitChange"])(), _dec3 = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_3__["emitChange"])(), _dec4 = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_3__["emitChange"])(), (_class = (_temp =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Group, _Emitter);

  /**
   * Create a group instance.
   *
   * @param {object} props
   */
  function Group() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Group);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Group).call(this));
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
    Object.assign(_assertThisInitialized(_this), _objectSpread({}, defaults, {}, props));
    return _this;
  }
  /**
   * Get timelines
   *
   * @returns {Timelines}
   */


  _createClass(Group, [{
    key: "toObject",

    /**
     * Convert group to object
     *
     * @returns {object}
     */
    value: function toObject() {
      var name = this.name;
      var timeScale = this.timeScale;
      var timelines = this.timelines.toArray();
      return {
        name: name,
        timeScale: timeScale,
        timelines: timelines
      };
    }
  }, {
    key: "reset",
    value: function reset() {
      var killed = false;

      if (this.timeline) {
        killed = true;
        _utils__WEBPACK_IMPORTED_MODULE_1__["gsap"].killTimeline(this.timeline); // reset styles

        this.timelines.each(function (tl) {
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

  }, {
    key: "resolve",
    value: function resolve() {
      this.reset();
      var root = this._list && this._list.rootEl ? this._list.rootEl : null;

      if (!root) {
        return this;
      }

      var hasUnresolved = false;
      this.timelines.each(function (timeline) {
        if (timeline.type === 'dom') {
          timeline.transformObject = !root ? null : _utils__WEBPACK_IMPORTED_MODULE_1__["resolver"].resolveElement(root, timeline);

          if (timeline.transformObject) {
            timeline.path = _utils__WEBPACK_IMPORTED_MODULE_1__["xpath"].getExpression(timeline.transformObject, root);
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
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["debug"])()) {
          console.warn("Could not resolve all elements for group ".concat(this.name), this.unresolved);
        }

        this.emit('unresolve', this.unresolved);
      }

      return this;
    }
    /**
     * Construct GSAP timeline
     *
     * @param   {boolean} resolve elements
     * @returns {TimelineMax|TimelineLite}
     */

  }, {
    key: "construct",
    value: function construct() {
      var _this2 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      try {
        if (!_utils__WEBPACK_IMPORTED_MODULE_1__["gsap"].has()) {
          if (Object(_utils__WEBPACK_IMPORTED_MODULE_1__["debug"])()) {
            console.warn("Cannot construct group ".concat(this.name, ". GSAP not found."));
          }

          throw new Error('GSAP cannot be found');
        }

        resolve && this.resolve();

        if (!this.reset()) {
          this.timeline = new _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline({
            paused: true
          }); // eslint-disable-line new-cap
        }

        this.resolved.each(function (timeline) {
          if (timeline.type === 'dom' && timeline.transformObject instanceof window.Element) {
            try {
              _this2.timeline.add(_utils__WEBPACK_IMPORTED_MODULE_1__["gsap"].generateTimeline(timeline).play(), 0, 'start');
            } catch (err) {
              throw new _utils_errors__WEBPACK_IMPORTED_MODULE_4__["TimelineError"](err.message, timeline.transformObject, err.stack);
            }
          }
        });
        this.timeline.timeScale(this.timeScale);
        this._duration = this.timeline.duration();
      } catch (err) {
        err.message = "Could not construct timeline: ".concat(err.message);
        throw err;
      }

      this.emit('construct', this.timeline);
      return this.timeline;
    }
  }, {
    key: "timelines",
    get: function get() {
      return this._timelines;
    }
    /**
     * Get unresolved timelines
     *
     * @returns {Timelines}
     */
    ,

    /**
     * Set timelines
     *
     * @param {Timelines} timelines
     */
    set: function set(timelines) {
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
     */
    ,
    set: function set(scale) {
      if (!(typeof scale === 'number' && isFinite(scale))) {
        throw new Error('timeScale needs to be a number');
      }

      if (this.timeline && this.timeline instanceof _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline) {
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
     */
    ,
    set: function set(val) {
      if (this.timeline && this.timeline instanceof _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline) {
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
     */
    ,
    set: function set(name) {
      if (typeof name !== 'string') {
        throw new Error('Name needs to be a string');
      }

      this._name = name;
    }
  }]);

  return Group;
}(_utils_events__WEBPACK_IMPORTED_MODULE_5__["Emitter"]), _temp), (_applyDecoratedDescriptor(_class.prototype, "timelines", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "timelines"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "timeScale", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "timeScale"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "duration", [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, "duration"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "name", [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, "name"), _class.prototype)), _class));

Group.fromObject = function (obj) {
  return new Group(obj);
};

/* harmony default export */ __webpack_exports__["default"] = (Group);

/***/ }),

/***/ "./src/group/groups.js":
/*!*****************************!*\
  !*** ./src/group/groups.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/group/group.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _registry_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../registry/registry */ "./src/registry/registry.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }






var Groups =
/*#__PURE__*/
function (_List) {
  _inherits(Groups, _List);

  /**
   * Create a groups instance.
   *
   * @param {HTMLElement} rootEl define the animation root
   * @param {Array} data
   */
  function Groups() {
    var _this;

    var rootEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Groups);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Groups).call(this, data, _group__WEBPACK_IMPORTED_MODULE_1__["default"], [{
      name: 'untitled'
    }]));
    _this.rootEl = null;

    if (!(rootEl instanceof window.Element)) {
      throw new Error('No root element provided.');
    }

    _this.rootEl = rootEl; // add groups to registry

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


  _createClass(Groups, [{
    key: "add",
    value: function add(group) {
      var affected = _get(_getPrototypeOf(Groups.prototype), "add", this).call(this, group);

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
     */

  }, {
    key: "remove",
    value: function remove(group) {
      var affected = _get(_getPrototypeOf(Groups.prototype), "remove", this).call(this, group);

      Array.isArray(affected) ? affected.forEach(function (g) {
        return _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].remove(g);
      }) : _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"].remove(affected);
      return affected;
    }
    /**
     * Construct all groups
     *
     * @returns {Array.<TimelineLite|TimelineMax>}
     */

  }, {
    key: "construct",
    value: function construct() {
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!_utils__WEBPACK_IMPORTED_MODULE_2__["gsap"].has()) {
        Object(_utils__WEBPACK_IMPORTED_MODULE_2__["debug"])() && console.warn('Trying to construct groups, but GSAP cannot be found.');
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
     */

  }, {
    key: "get",
    value: function get(name) {
      return this.list.find(function (group) {
        return group.name === name;
      });
    }
  }]);

  return Groups;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Groups);

/***/ }),

/***/ "./src/group/index.js":
/*!****************************!*\
  !*** ./src/group/index.js ***!
  \****************************/
/*! exports provided: EvalMap, Group, Groups, Keyframe, Keyframes, Prop, Props, Timeline, Timelines */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _evalmap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./evalmap */ "./src/group/evalmap.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "EvalMap", function() { return _evalmap__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./group */ "./src/group/group.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Group", function() { return _group__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _groups__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./groups */ "./src/group/groups.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Groups", function() { return _groups__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _keyframe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./keyframe */ "./src/group/keyframe.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keyframe", function() { return _keyframe__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _keyframes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyframes */ "./src/group/keyframes.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Keyframes", function() { return _keyframes__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./prop */ "./src/group/prop.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Prop", function() { return _prop__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./props */ "./src/group/props.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Props", function() { return _props__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _timeline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./timeline */ "./src/group/timeline.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timeline", function() { return _timeline__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _timelines__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./timelines */ "./src/group/timelines.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Timelines", function() { return _timelines__WEBPACK_IMPORTED_MODULE_8__["default"]; });












/***/ }),

/***/ "./src/group/keyframe.js":
/*!*******************************!*\
  !*** ./src/group/keyframe.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
var _dec, _dec2, _dec3, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }




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

var Keyframe = (_dec = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_1__["emitChange"])('time', null, [{
  validator: function validator(val) {
    return typeof val === 'number';
  },
  message: 'Time must be a number'
}]), _dec2 = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_1__["emitChange"])('ease', null), _dec3 = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_1__["emitChange"])(), _dec(_class = _dec2(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Keyframe, _Emitter);

  /**
   * Keyframe.
   *
   * @param {number}  time    position (in seconds) on timeline
   * @param {*}       value   value assigned
   * @param {string}  ease    easing value (optional)
   */
  function Keyframe(time, value) {
    var _this;

    var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Keyframe);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Keyframe).call(this));
    _this._list = null;
    _this._value = null;
    _this.mappings = [];
    ease = ease || null;
    Object.assign(_assertThisInitialized(_this), {
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


  _createClass(Keyframe, [{
    key: "next",
    value: function next() {
      return this._next;
    }
    /**
     * Get previous keyframe (linked list)
     *
     * @returns {Keyframe|null}
     */

  }, {
    key: "prev",
    value: function prev() {
      return this._prev;
    }
    /**
     * Get the  value
     *
     * @returns {*}
     */

  }, {
    key: "isEval",

    /**
     * Check if current keyframe has an evaluable value
     *
     * @returns {boolean}
     */
    value: function isEval() {
      return /{(.*?)}/.test(this._value);
    }
    /**
     * Convert to readable object
     *
     * @param   {boolean} ignoreEval
     * @returns {object} { "0.2s": { value: 10, ease: "Linear.easeNone" }}
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var value;

      try {
        value = ignoreEval ? this._value : this.value;
      } catch (err) {
        value = this._value;
      }

      return _defineProperty({}, "".concat(this.time, "s"), {
        value: value,
        ease: this.ease
      });
    }
    /**
     * Destroy events
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.removeAllListeners();
    }
  }, {
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
        }, {}); // apply mappings

        var val = this._value;

        for (var mapping in mappings) {
          val = val.replace(mappings[mapping].regex, "mappings[".concat(mapping, "].map"));
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
     */
    ,
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

  return Keyframe;
}(_utils_events__WEBPACK_IMPORTED_MODULE_2__["Emitter"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "value", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "value"), _class2.prototype)), _class2)) || _class) || _class);
/**
 * Create keyframe instance from object
 *
 * @example { "0.2s": { value: 10, ease: "Linear.easeNone" }}
 * @param   {object} obj
 * @returns {Keyframe}
 */

Keyframe.fromObject = function (obj) {
  if (!_utils__WEBPACK_IMPORTED_MODULE_0__["is"].isObject(obj)) {
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

  if (!_utils__WEBPACK_IMPORTED_MODULE_0__["is"].isObject(obj[time]) && (typeof obj[time] === 'string' || typeof obj[time] === 'number')) {
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
/* harmony default export */ __webpack_exports__["default"] = (Keyframe);

/***/ }),

/***/ "./src/group/keyframes.js":
/*!********************************!*\
  !*** ./src/group/keyframes.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _keyframe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyframe */ "./src/group/keyframe.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Keyframes =
/*#__PURE__*/
function (_List) {
  _inherits(Keyframes, _List);

  /**
   * Create keyframes
   *
   * @constructor
   * @param {Array|object} keyframes
   */
  function Keyframes() {
    var _this;

    var keyframes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Keyframes);

    if (_utils__WEBPACK_IMPORTED_MODULE_2__["is"].isObject(keyframes)) {
      keyframes = _utils__WEBPACK_IMPORTED_MODULE_2__["convert"].objectToArray(keyframes);
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Keyframes).call(this, keyframes, _keyframe__WEBPACK_IMPORTED_MODULE_1__["default"], [0, 0]));
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


  _createClass(Keyframes, [{
    key: "add",
    value: function add(keyframe) {
      var _this2 = this;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["is"].isObject(keyframe) && !(keyframe instanceof _keyframe__WEBPACK_IMPORTED_MODULE_1__["default"]) && Object.keys(keyframe).length > 1) {
        keyframe = _utils__WEBPACK_IMPORTED_MODULE_2__["convert"].objectToArray(keyframe);
      }

      var affected = _get(_getPrototypeOf(Keyframes.prototype), "add", this).call(this, keyframe);

      var exec = function exec(keyframe) {
        keyframe.mappings = _toConsumableArray(_this2.mappings);
      };

      Array.isArray(affected) ? affected.forEach(exec) : exec(affected);
      return affected;
    }
    /**
     * Remove keyframe
     *
     * @param {Keyframe}
     * @returns {Keyframe}
     */

  }, {
    key: "remove",
    value: function remove(keyframe) {
      var affected = _get(_getPrototypeOf(Keyframes.prototype), "remove", this).call(this, keyframe);

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
     */

  }, {
    key: "get",

    /**
     * Get keyframe at time
     *
     * @param   {string} time
     * @returns {Keyframe}
     */
    value: function get(time) {
      var t = parseFloat(time); // get keyframe at time

      return this._list.find(function (p) {
        return p.time === t;
      });
    }
    /**
     * Convert keyframes to object
     *
     * @param   {boolean} ignoreEval
     * @returns {object}
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.list.reduce(function (obj, keyframe) {
        return _objectSpread({}, obj, {}, keyframe.toObject(ignoreEval));
      }, {});
    }
    /**
     * Destroy events
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.removeAllListeners();
      this.each(function (keyframe) {
        return keyframe.destroy();
      });
    }
  }, {
    key: "mappings",
    get: function get() {
      return this._mappings;
    }
    /**
     * Set mappings for these keyframes
     *
     * @param {Array} mappings
     */
    ,
    set: function set(mappings) {
      this._mappings = mappings;
      this.each(function (keyframe) {
        keyframe.mappings = _toConsumableArray(mappings);
      });
    }
  }]);

  return Keyframes;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);

Keyframes.Events = ['change:list', 'add', 'remove', 'change', 'change:time', 'change:value', 'change:ease'];
/* harmony default export */ __webpack_exports__["default"] = (Keyframes);

/***/ }),

/***/ "./src/group/prop.js":
/*!***************************!*\
  !*** ./src/group/prop.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _keyframes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./keyframes */ "./src/group/keyframes.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _utils_polyfill__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/polyfill */ "./src/utils/polyfill.js");
var _dec, _dec2, _class, _class2, _temp;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }






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

var Prop = (_dec = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_2__["emitChange"])('name', null, [{
  validator: function validator(val) {
    return typeof val === 'string';
  },
  message: 'Name must be a string'
}, {
  validator: function validator(val) {
    return !/^\d+\.?\d*?$/.test(val);
  },
  message: 'Name must be a string'
}]), _dec2 = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_2__["emitChange"])(), _dec(_class = (_class2 = (_temp =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Prop, _Emitter);

  /**
   * Property.
   *
   * @param {string} name
   * @param {object|Keyframes|Array} keyframes
   */
  function Prop(name) {
    var _this;

    var keyframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"]();

    _classCallCheck(this, Prop);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Prop).call(this));
    _this._keyframes = null;
    _this._list = null;

    if (!(keyframes instanceof _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"])) {
      keyframes = new _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"](keyframes);
    }

    name = name || null;
    Object.assign(_assertThisInitialized(_this), {
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


  _createClass(Prop, [{
    key: "next",
    value: function next() {
      return this._next;
    }
    /**
     * Get previous property (linked list)
     *
     * @returns {Prop|null}
     */

  }, {
    key: "prev",
    value: function prev() {
      return this._prev;
    }
    /**
     * Get the list where this prop is added to
     *
     * @returns {Props|null}
     */

  }, {
    key: "setupBubbleEvents",

    /**
     * Bubble events from keyframes
     */
    value: function setupBubbleEvents() {
      var _this2 = this;

      if (this._keyframes instanceof _keyframes__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        this._keyframes.removeAllListeners();

        var evt = function evt(from, to) {
          _this2._keyframes.on(from, _utils__WEBPACK_IMPORTED_MODULE_1__["events"].bubbleEvent(to, _this2));
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
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var keyframes = this.keyframes ? this.keyframes.toObject(ignoreEval) : {};
      return _defineProperty({}, this.name, keyframes);
    }
    /**
     * Determine if this property is a CSS transform
     *
     * @returns {boolean}
     */

  }, {
    key: "isCSSTransform",
    value: function isCSSTransform() {
      return Object(_utils_polyfill__WEBPACK_IMPORTED_MODULE_4__["includes"])(['x', 'y', 'z', 'rotation', 'rotationZ', 'rotationX', 'rotationY', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY'], this.name);
    }
    /**
     * Destroy.
     * Clear events
     */

  }, {
    key: "destroy",
    value: function destroy() {
      if (this._keyframes) {
        this._keyframes.destroy();
      }

      this.removeAllListeners();
    }
  }, {
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
     */
    ,
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

  return Prop;
}(_utils_events__WEBPACK_IMPORTED_MODULE_3__["Emitter"]), _temp), (_applyDecoratedDescriptor(_class2.prototype, "keyframes", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "keyframes"), _class2.prototype)), _class2)) || _class);
/**
 * Create a valid Prop from object
 *
 * @param   {object} obj
 * @returns {Prop}
 */

Prop.fromObject = function (obj) {
  if (!_utils__WEBPACK_IMPORTED_MODULE_1__["is"].isObject(obj)) {
    throw new Error('Object is invalid');
  }

  var keys = Object.keys(obj);

  if (keys.length === 0) {
    throw new Error('Object is invalid');
  }

  for (var i in obj) {
    if (!_utils__WEBPACK_IMPORTED_MODULE_1__["is"].isObject(obj[i])) {
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
/* harmony default export */ __webpack_exports__["default"] = (Prop);

/***/ }),

/***/ "./src/group/props.js":
/*!****************************!*\
  !*** ./src/group/props.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _prop__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./prop */ "./src/group/prop.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var Props =
/*#__PURE__*/
function (_List) {
  _inherits(Props, _List);

  /**
   * Create properties
   *
   * @constructor
   * @param {Array|object} props
   */
  function Props() {
    var _this;

    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Props);

    if (_utils__WEBPACK_IMPORTED_MODULE_2__["is"].isObject(props)) {
      props = _utils__WEBPACK_IMPORTED_MODULE_2__["convert"].objectToArray(props);
    }

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Props).call(this, props, _prop__WEBPACK_IMPORTED_MODULE_1__["default"], ['prop']));
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


  _createClass(Props, [{
    key: "get",
    value: function get(name) {
      return this._list.find(function (p) {
        return p.name === name;
      });
    }
    /**
     * Get mappings for these properties
     *
     * @returns {Array}
     */

  }, {
    key: "add",

    /**
     * Add properties
     *
     * @param {*|Array} k
     * @returns {*}
     */
    value: function add(prop) {
      var _this2 = this;

      if (_utils__WEBPACK_IMPORTED_MODULE_2__["is"].isObject(prop) && !(prop instanceof _prop__WEBPACK_IMPORTED_MODULE_1__["default"]) && Object.keys(prop).length > 1) {
        prop = _utils__WEBPACK_IMPORTED_MODULE_2__["convert"].objectToArray(prop);
      }

      var affected = _get(_getPrototypeOf(Props.prototype), "add", this).call(this, prop);

      var exec = function exec(prop) {
        prop.keyframes.mappings = _toConsumableArray(_this2.mappings);
      };

      Array.isArray(affected) ? affected.forEach(exec) : exec(affected);
      return affected;
    }
    /**
     * Remove property
     *
     * @param {Prop}
     * @returns {Prop}
     */

  }, {
    key: "remove",
    value: function remove(prop) {
      var affected = _get(_getPrototypeOf(Props.prototype), "remove", this).call(this, prop);

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
     */

  }, {
    key: "haveProp",
    value: function haveProp(name) {
      return !!this.get(name);
    }
    /**
     * Convert properties to object
     *
     * @param   {boolean} ignoreEval
     * @returns {object}
     */

  }, {
    key: "toObject",
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return this.list.reduce(function (obj, prop) {
        return _objectSpread({}, obj, {}, prop.toObject(ignoreEval));
      }, {});
    }
    /**
     * Destroy events
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.each(function (prop) {
        return prop.destroy();
      });
      this.removeAllListeners();
    }
  }, {
    key: "mappings",
    get: function get() {
      return this._mappings;
    }
    /**
     * Set mappings for these properties
     *
     * @param {Array} mappings
     */
    ,
    set: function set(mappings) {
      this._mappings = mappings;
      this.each(function (prop) {
        prop.keyframes.mappings = _toConsumableArray(mappings);
      });
    }
  }]);

  return Props;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);

Props.Events = ['change:list', 'add', 'remove', 'change', 'change:name', 'change:keyframes', 'change:keyframes:list', 'change:keyframe', 'change:keyframe:time', 'change:keyframe:value', 'change:keyframe:ease', 'add:keyframe', 'remove:keyframe'];
/* harmony default export */ __webpack_exports__["default"] = (Props);

/***/ }),

/***/ "./src/group/timeline.js":
/*!*******************************!*\
  !*** ./src/group/timeline.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./props */ "./src/group/props.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");
/* harmony import */ var _utils_emitter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/emitter */ "./src/utils/emitter.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
/* harmony import */ var _evalmap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./evalmap */ "./src/group/evalmap.js");
var _dec, _class, _temp;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }






/**
 * Timeline.
 */

var Timeline = (_dec = Object(_utils_emitter__WEBPACK_IMPORTED_MODULE_2__["emitChange"])(), (_class = (_temp =
/*#__PURE__*/
function (_Emitter) {
  _inherits(Timeline, _Emitter);

  /**
   * Timeline type.
   * Can be "dom" or "object"
   *
   * @type {string}
   */

  /**
   * Object to apply transforms on.
   * If type is "dom" it refers to a HTMLElement else a plain javascript object
   *
   * @type {HTMLElement|Object}
   */

  /**
   * Defined label representing this timeline node.
   *
   * @type {string|null}
   */

  /**
   * XPath of element, normalized by group element.
   * Only relevant if type is "dom"
   *
   * @type {string|null}
   */

  /**
   * Identifier to select element. Override the path for resolving transformObject.
   * By default the id is set on element attribute [data-spirit-id].
   *
   * @type {string|null}
   */

  /**
   * Properties for this timeline.
   *
   * @type {Props}
   */

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
  function Timeline() {
    var _this;

    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dom';
    var transformObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _props__WEBPACK_IMPORTED_MODULE_0__["default"]();
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var label = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, Timeline);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timeline).call(this));
    _this.type = 'dom';
    _this._transformObject = null;
    _this.label = null;
    _this.path = null;
    _this.id = null;
    _this.props = null;
    Object.assign(_assertThisInitialized(_this), {
      type: type,
      props: props instanceof _props__WEBPACK_IMPORTED_MODULE_0__["default"] ? props : new _props__WEBPACK_IMPORTED_MODULE_0__["default"](props),
      label: label,
      path: path,
      id: id
    });
    _this.transformObject = transformObject;
    return _this;
  }

  _createClass(Timeline, [{
    key: "validate",
    value: function validate() {
      if (this.type === 'dom' && _utils__WEBPACK_IMPORTED_MODULE_1__["context"].isBrowser() && this.transformObject && !(this.transformObject instanceof window.Element)) {
        throw new Error('transformObject needs to be an element');
      }

      if (this.type === 'object' && this.transformObject && !_utils__WEBPACK_IMPORTED_MODULE_1__["is"].isObject(this.transformObject)) {
        throw new Error('transformObject needs to be an object');
      }
    }
  }, {
    key: "toObject",
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
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
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.props instanceof _props__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        this.props.each(function (tr) {
          return tr.destroy();
        });
      }
    }
  }, {
    key: "transformObject",
    set: function set(transformObject) {
      this._transformObject = transformObject;
      this.validate();

      if (transformObject && this.props instanceof _props__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        var thisMapper = this.props.mappings.find(function (mapping) {
          return String(mapping.regex) === '/this/g';
        });
        thisMapper ? thisMapper.map = transformObject : this.props.mappings.push(new _evalmap__WEBPACK_IMPORTED_MODULE_4__["default"](/this/g, transformObject));
        this.props.mappings = _toConsumableArray(this.props.mappings);
      }

      if (this.type === 'dom' && transformObject instanceof window.Element) {
        this._style = transformObject.getAttribute('style');
      }
    },
    get: function get() {
      return this._transformObject;
    }
  }]);

  return Timeline;
}(_utils_events__WEBPACK_IMPORTED_MODULE_3__["Emitter"]), _temp), (_applyDecoratedDescriptor(_class.prototype, "transformObject", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "transformObject"), _class.prototype)), _class));

Timeline.fromObject = function (obj) {
  if (!_utils__WEBPACK_IMPORTED_MODULE_1__["is"].isObject(obj)) {
    throw new Error('Object is invalid.');
  }

  var args = _utils__WEBPACK_IMPORTED_MODULE_1__["convert"].objectToArray(obj).filter(function (arg) {
    return arg !== undefined;
  });
  args = _objectSpread({
    type: args.type || 'dom',
    props: {}
  }, _utils__WEBPACK_IMPORTED_MODULE_1__["convert"].arrayToObject(args));
  return new Timeline(args.type, args.transformObject, args.props, args.path || undefined, args.id || undefined, args.label || undefined);
};

/* harmony default export */ __webpack_exports__["default"] = (Timeline);

/***/ }),

/***/ "./src/group/timelines.js":
/*!********************************!*\
  !*** ./src/group/timelines.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _timeline__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./timeline */ "./src/group/timeline.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Timelines =
/*#__PURE__*/
function (_List) {
  _inherits(Timelines, _List);

  /**
   * Create timelines instance.
   *
   * @param {Array} timelines
   */
  function Timelines() {
    var timelines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Timelines);

    return _possibleConstructorReturn(this, _getPrototypeOf(Timelines).call(this, timelines, _timeline__WEBPACK_IMPORTED_MODULE_1__["default"], ['object', {}]));
  }
  /**
   * Get timeline by transformObject
   *
   * @param   {HTMLElement|object} transformObject
   * @returns {Timeline}
   */


  _createClass(Timelines, [{
    key: "get",
    value: function get(transformObject) {
      return this._list.find(function (tl) {
        return tl.transformObject === transformObject;
      });
    }
  }]);

  return Timelines;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (Timelines);

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: config, version, setup, groups, create, load, loadAnimation, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./config/config */ "./src/config/config.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "config", function() { return _config_config__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _config_setup__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./config/setup */ "./src/config/setup.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return _config_setup__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _registry_registry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./registry/registry */ "./src/registry/registry.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "groups", function() { return _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _data_parser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./data/parser */ "./src/data/parser.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "create", function() { return _data_parser__WEBPACK_IMPORTED_MODULE_4__["create"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "load", function() { return _data_parser__WEBPACK_IMPORTED_MODULE_4__["load"]; });

/* harmony import */ var _loadAnimation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loadAnimation */ "./src/loadAnimation.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadAnimation", function() { return _loadAnimation__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _utils_debug__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/debug */ "./src/utils/debug.js");

var version = "2.4.2";







var spirit = {
  config: _config_config__WEBPACK_IMPORTED_MODULE_1__["default"],
  version: version,
  setup: _config_setup__WEBPACK_IMPORTED_MODULE_2__["default"],
  groups: _registry_registry__WEBPACK_IMPORTED_MODULE_3__["default"],
  create: _data_parser__WEBPACK_IMPORTED_MODULE_4__["create"],
  load: _data_parser__WEBPACK_IMPORTED_MODULE_4__["load"],
  loadAnimation: _loadAnimation__WEBPACK_IMPORTED_MODULE_5__["default"]
};
/* harmony default export */ __webpack_exports__["default"] = (spirit);

if (_utils__WEBPACK_IMPORTED_MODULE_0__["context"].isBrowser()) {
  if (window !== undefined) {
    // add to global namespace so Spirit Studio can reach it
    window.spirit = spirit;
  }

  if (Object(_utils_debug__WEBPACK_IMPORTED_MODULE_6__["default"])()) {
    console.warn("You are running the development build of Spirit v".concat(version, "."));
  }
}

/***/ }),

/***/ "./src/list/list.js":
/*!**************************!*\
  !*** ./src/list/list.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/is */ "./src/utils/is.js");
/* harmony import */ var _utils_events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/events */ "./src/utils/events.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }



/**
 * List
 *
 * @fires List#add
 * @fires List#remove
 * @fires List#change:list
 */

var List =
/*#__PURE__*/
function (_Emitter) {
  _inherits(List, _Emitter);

  /**
   * Create List
   *
   * @param {Array}           items
   * @param {*}               model
   * @param {Array|undefined} defaultModelArgs
   */
  function List() {
    var _this;

    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var defaultModelArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, List);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(List).call(this));
    _this._list = [];
    _this._model = null;
    _this._duplicates = true;
    _this._sortOn = false;
    _this._linkedList = false;
    _this._model = model;

    if (model) {
      var testProto = defaultModelArgs !== undefined ? _construct(model, _toConsumableArray(defaultModelArgs)) // eslint-disable-line new-cap
      : new model(); // eslint-disable-line new-cap

      if (typeof testProto.toObject !== 'function') {
        throw new Error('Invalid Model prototype. model.toObject does not exist.');
      }
    }

    if (!Array.isArray(items)) {
      throw new Error('Items should be an array');
    } // parse initial list


    _this._list = items.reduce(function (list, item) {
      if (_this._model) {
        if (item instanceof _this._model) {
          item._list = _assertThisInitialized(_this);

          if (item.setupBubbleEvents && typeof item.setupBubbleEvents === 'function') {
            item.setupBubbleEvents();
          }

          list.push(item);
        } else {
          if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isObject"](item) && typeof model.fromObject === 'function') {
            var itemFromModel = model.fromObject(item);
            itemFromModel._list = _assertThisInitialized(_this);

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


  _createClass(List, [{
    key: "checkOnDuplicates",

    /**
     * Check current list on duplicates
     */
    value: function checkOnDuplicates() {
      var dup = this._duplicates;
      var uniq = false;
      var isProp = false; // check based on boolean

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
      } // check based on object property


      if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isObject"](dup) && dup.hasOwnProperty('prop')) {
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
        var p = isProp ? "".concat(dup.prop, ": ").concat(prop) : false;
        var m = this._model ? "".concat(this.constructor.name, " > ").concat(this._model.name, " > { ").concat(p, " }") : false;
        throw new Error("List has duplicates. ".concat(m));
      }
    }
    /**
     * Get the sort type of this list
     *
     * @returns {boolean|string}
     */

  }, {
    key: "sort",

    /**
     * Sort list based on sort type
     */
    value: function sort() {
      var so = this._sortOn; // sort on primitives

      if (typeof so === 'boolean' && so === true) {
        this._list = this._list.sort();
      } // sort on property


      if (typeof so === 'string') {
        this._list = this._list.sort(function (a, b) {
          var valA = a[so];
          var valB = b[so];

          if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isNumeric"](valA)) {
            return valA - valB;
          }

          String(valA).localeCompare(String(valB));
        });
      } // sort on function


      if (typeof so === 'function') {
        this._list = this._list.sort(so);
      }
    }
    /**
     * Is current list linked?
     *
     * @returns {boolean}
     */

  }, {
    key: "linkItems",

    /**
     * Link items to each other as a linked list based on sortOn
     * if this list is setup as a linked list
     */
    value: function linkItems() {
      if (this._linkedList) {
        for (var i = 0; i < this._list.length; i++) {
          if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isObject"](this._list[i])) {
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
     */

  }, {
    key: "at",

    /**
     * Get the value at index
     *
     * @param   {number} index
     * @returns {*}
     */
    value: function at(index) {
      if (index >= this._list.length) {
        throw new Error("Index exceeded. Requested ".concat(index, ", have length of ").concat(this.length));
      }

      return this._list[index];
    }
    /**
     * Add item to list
     *
     * @param   {*|Array} item
     * @fires   List#add
     * @returns {*}
     */

  }, {
    key: "add",
    value: function add(item) {
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
          } else if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isObject"](i) && typeof _this2._model.fromObject === 'function') {
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
     */

  }, {
    key: "remove",
    value: function remove(item) {
      var _this3 = this;

      var result = null;

      var removeSingle = function removeSingle(i) {
        var doRemove = function doRemove(ins) {
          var index = _this3._list.indexOf(ins);

          if (index > -1) {
            _this3._list.splice(index, 1);

            if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isObject"](ins)) {
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
     */

  }, {
    key: "clear",
    value: function clear() {
      this.each(this.remove.bind(this));
    }
    /**
     * Walk over each item
     *
     * @returns {*}
     */

  }, {
    key: "each",
    value: function each(cb) {
      var list = _toConsumableArray(this.list);

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
     */

  }, {
    key: "toArray",
    value: function toArray() {
      var l = this._model ? this.list.map(function (item) {
        return item.toObject();
      }) : this.list;
      return l.reduce(function (a, b) {
        if (_utils_is__WEBPACK_IMPORTED_MODULE_0__["isObject"](b)) {
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
    }
  }, {
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
     */
    ,
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
     */
    ,
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
     */
    ,
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
     */
    ,
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

  return List;
}(_utils_events__WEBPACK_IMPORTED_MODULE_1__["Emitter"]);

List.Events = ['change:list', 'add', 'remove'];
/* harmony default export */ __webpack_exports__["default"] = (List);

/***/ }),

/***/ "./src/loadAnimation.js":
/*!******************************!*\
  !*** ./src/loadAnimation.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _config_setup__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config/setup */ "./src/config/setup.js");
/* harmony import */ var _data_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/parser */ "./src/data/parser.js");
/* harmony import */ var _utils_is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/is */ "./src/utils/is.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config/config */ "./src/config/config.js");
/* harmony import */ var _registry_registry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./registry/registry */ "./src/registry/registry.js");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






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

  if (!(Object(_utils_is__WEBPACK_IMPORTED_MODULE_2__["isObject"])(data) || Array.isArray(data))) {
    return Promise.reject(new Error('Invalid animation data'));
  }

  return Promise.resolve(Object(_data_parser__WEBPACK_IMPORTED_MODULE_1__["create"])(data, container));
}
/**
 * Load from path
 *
 * @param {string}  path
 * @param {Element} container
 * @return {Promise<Array|object>}
 */


function loadFromPath(path, container) {
  if (path && typeof path === 'string' && path.length > 0) {
    return Object(_data_parser__WEBPACK_IMPORTED_MODULE_1__["load"])(path, container);
  }

  return Promise.resolve([]);
}
/**
 * Load animation shorthand
 *
 * @param  {object} manifest
 * @return {Promise<Array|Function>}
 */


/* harmony default export */ __webpack_exports__["default"] = (function (manifest) {
  var options = _objectSpread({}, defaults, {}, manifest);

  var animationData = options.animationData,
      container = options.container,
      path = options.path;

  if (options.loop === true) {
    options.loop = -1;
  }

  return new Promise(function (resolve, reject) {
    var result = [];

    var add = function add(coll) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(Array.isArray(coll) ? _toConsumableArray(coll) : [coll]));
    }; // setup gsap


    Object(_config_setup__WEBPACK_IMPORTED_MODULE_0__["default"])().then(function () {
      return Promise.all([createFromData(animationData, container), loadFromPath(path, container)]);
    }).then(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          created = _ref2[0],
          loaded = _ref2[1];

      add(created);
      add(loaded);
    }).then(function () {
      // one animation group, return it's timeline directly
      if (result.length === 1 && result[0].length === 1) {
        return result[0].at(0).construct();
      } // multiple groups!


      var g = {};
      result.forEach(function (groups) {
        groups.each(function (group) {
          g[group.name] = group.construct();

          g[group.name].construct = function () {
            var tl = _registry_registry__WEBPACK_IMPORTED_MODULE_4__["default"].get(group.name).construct();
            tl.construct = this.construct;
            return tl;
          };
        });
      });
      return g;
    }).then(function (res) {
      var timelines = res instanceof _config_config__WEBPACK_IMPORTED_MODULE_3__["default"].gsap.timeline ? [res] : Object.keys(res).map(function (k) {
        return res[k];
      });

      for (var i = 0; i < timelines.length; i++) {
        var timeline = timelines[i];

        if (options.loop) {
          timeline.repeat(options.loop);
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
      } // finally resolve res


      resolve(res);
    })["catch"](reject);
  });
});

/***/ }),

/***/ "./src/registry/registry.js":
/*!**********************************!*\
  !*** ./src/registry/registry.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../group */ "./src/group/index.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }




var Registry =
/*#__PURE__*/
function (_List) {
  _inherits(Registry, _List);

  function Registry() {
    _classCallCheck(this, Registry);

    return _possibleConstructorReturn(this, _getPrototypeOf(Registry).call(this, []));
  }
  /**
   * Add unique group
   *
   * @param {Group} group
   */


  _createClass(Registry, [{
    key: "add",
    value: function add(group) {
      if (!(group instanceof _group__WEBPACK_IMPORTED_MODULE_1__["Group"])) {
        throw new Error('Invalid group. Only Group instances allowed.');
      }

      _get(_getPrototypeOf(Registry.prototype), "add", this).call(this, group);
    }
    /**
     * Remove group from registry
     *
     * @param   {Group} group
     * @returns {Group}
     */

  }, {
    key: "remove",
    value: function remove(group) {
      group.reset();
      return _get(_getPrototypeOf(Registry.prototype), "remove", this).call(this, group);
    }
    /**
     * Get group by name
     *
     * @param   {string} name
     * @returns {Group}
     */

  }, {
    key: "get",
    value: function get(name) {
      return this.list.find(function (g) {
        return g.name === name;
      });
    }
    /**
     * Get all group names from registry
     *
     * @returns {Array}
     */

  }, {
    key: "groupNames",
    value: function groupNames() {
      return this.list.map(function (g) {
        return g.name;
      });
    }
  }]);

  return Registry;
}(_list_list__WEBPACK_IMPORTED_MODULE_0__["default"]);

/* harmony default export */ __webpack_exports__["default"] = (new Registry());

/***/ }),

/***/ "./src/utils/autobind.js":
/*!*******************************!*\
  !*** ./src/utils/autobind.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./polyfill */ "./src/utils/polyfill.js");
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return arguments.length === 1 ? boundClass.apply(void 0, arguments) : boundMethod.apply(void 0, arguments);
});
var ignoreMethods = ['constructor'];

function boundClass(target) {
  var keys = Object.getOwnPropertyNames(target.prototype);

  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
  }

  keys.forEach(function (key) {
    if (Object(_polyfill__WEBPACK_IMPORTED_MODULE_0__["includes"])(ignoreMethods, key)) {
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
    throw new Error("@autobind decorator can only be applied to methods not: ".concat(_typeof(fn)));
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
/*! exports provided: isBrowser */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isBrowser", function() { return isBrowser; });
function isBrowser() {
  return 'window' in global && 'document' in global;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./src/utils/convert.js":
/*!******************************!*\
  !*** ./src/utils/convert.js ***!
  \******************************/
/*! exports provided: objectToArray, arrayToObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "objectToArray", function() { return objectToArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayToObject", function() { return arrayToObject; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Convert object to array
 *
 * @param   {object} obj
 * @returns {Array}
 */
function objectToArray(obj) {
  return Object.keys(obj).reduce(function (a, b) {
    a.push(_defineProperty({}, b, obj[b]));
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
    a = _objectSpread({}, a, {}, b);
    return a;
  }, {});
}

/***/ }),

/***/ "./src/utils/debug.js":
/*!****************************!*\
  !*** ./src/utils/debug.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");



var debug = function debug() {
  return Object(_context__WEBPACK_IMPORTED_MODULE_0__["isBrowser"])() && Boolean(_config_config__WEBPACK_IMPORTED_MODULE_1__["default"].debug);
};

/* harmony default export */ __webpack_exports__["default"] = (debug);

/***/ }),

/***/ "./src/utils/emitter.js":
/*!******************************!*\
  !*** ./src/utils/emitter.js ***!
  \******************************/
/*! exports provided: emitChange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "emitChange", function() { return emitChange; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./events */ "./src/utils/events.js");
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

  if (!_events__WEBPACK_IMPORTED_MODULE_0__["Emitter"].prototype.isPrototypeOf(target) && !_events__WEBPACK_IMPORTED_MODULE_0__["Emitter"].prototype.isPrototypeOf(target.prototype)) {
    throw new Error('@emitter.emitChange can only be applied to event emitters');
  }

  return _objectSpread({}, descriptor, {
    configurable: true,
    set: function set(val) {
      var _this = this;

      var toObj = function toObj(v) {
        return Object(_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(_this.toObject) ? _this.toObject() : _defineProperty({}, key, v !== undefined ? v : val);
      }; // get previous value


      var prev = this['_' + key];

      if (prev && typeof prev.toArray === 'function') {
        prev = prev.toArray();
      } else if (prev && typeof prev.toObject === 'function') {
        prev = prev.toObject();
      }

      var previous;

      if (prev !== val) {
        previous = toObj(prev);
      } // call class setter method


      fn.call(this, val); // is a duplicate on list?

      if (this._list instanceof _list_list__WEBPACK_IMPORTED_MODULE_1__["default"] && this._list._duplicates !== true) {
        try {
          this._list.checkOnDuplicates();
        } catch (err) {
          fn.call(this, prev);
          throw err;
        }
      } // only emit changes


      if (prev === val) {
        return;
      }

      var from = prev && Object(_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(prev.toObject) ? prev.toObject() : prev;
      var to = val && Object(_is__WEBPACK_IMPORTED_MODULE_2__["isFunction"])(val.toObject) ? val.toObject() : val;
      var changed = {
        type: key,
        from: from,
        to: to
      };
      var current;

      try {
        current = toObj();
      } catch (err) {
        current = _defineProperty({}, key, val);
      }

      var evtParams = {
        previous: previous,
        current: current,
        changed: changed
      };
      var evtChange = ['change', evtParams];
      var evtChangeProp = ["change:".concat(key), evtParams, val];
      this.emit.apply(this, evtChange);
      this.emit.apply(this, evtChangeProp);

      if (this._list && this._list instanceof _events__WEBPACK_IMPORTED_MODULE_0__["Emitter"]) {
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


function emitChange() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var validators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (prop) {
    // bind as class
    return function (target) {
      var _Object$definePropert;

      // setup class prototype
      Object.defineProperties(target.prototype, (_Object$definePropert = {}, _defineProperty(_Object$definePropert, "_".concat(prop), {
        value: defaultValue,
        writable: true,
        enumerable: false,
        configurable: true
      }), _defineProperty(_Object$definePropert, prop, {
        configurable: true,
        get: function get() {
          return this["_".concat(prop)];
        },
        set: function set(val) {
          var errors = validators.reduce(function (res, v) {
            if (!v.validator(val)) {
              res.push(v.message);
            }

            return res;
          }, []);

          if (errors.length > 0) {
            throw new Error("".concat(errors[0]));
          }

          this["_".concat(prop)] = val;
        }
      }), _Object$definePropert)); // apply setter on it

      var descriptor = Object.getOwnPropertyDescriptor(target.prototype, prop);
      Object.defineProperty(target.prototype, prop, setter(target, prop, descriptor));
    };
  } // bind as setter


  return setter;
}

/***/ }),

/***/ "./src/utils/errors.js":
/*!*****************************!*\
  !*** ./src/utils/errors.js ***!
  \*****************************/
/*! exports provided: TimelineError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimelineError", function() { return TimelineError; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TimelineError =
/*#__PURE__*/
function (_Error) {
  _inherits(TimelineError, _Error);

  function TimelineError(message, transformObject) {
    var _this;

    var stack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, TimelineError);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TimelineError).call(this, message));
    _this.transformObject = null;

    if (stack) {
      _this.stack = stack;
    } else {
      Error.captureStackTrace(_assertThisInitialized(_this), TimelineError);
    }

    _this.transformObject = transformObject;
    _this.name = 'TimelineError';
    _this.message = message;
    return _this;
  }

  return TimelineError;
}(_wrapNativeSuper(Error));

/***/ }),

/***/ "./src/utils/events.js":
/*!*****************************!*\
  !*** ./src/utils/events.js ***!
  \*****************************/
/*! exports provided: bubbleEvent, createEventObjectForModel, Emitter */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "bubbleEvent", function() { return bubbleEvent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createEventObjectForModel", function() { return createEventObjectForModel; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emitter", function() { return Emitter; });
/* harmony import */ var _list_list__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../list/list */ "./src/list/list.js");
/* harmony import */ var mitt__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! mitt */ "./node_modules/mitt/dist/mitt.es.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



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
    model: model.fromObject(_objectSpread({}, obj, _defineProperty({}, prop, nextVal))),
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

var Emitter =
/*#__PURE__*/
function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this._events = {};
    this._emitter = Object(mitt__WEBPACK_IMPORTED_MODULE_1__["default"])(this._events);
  }

  _createClass(Emitter, [{
    key: "eventNames",
    value: function eventNames() {
      return Object.keys(this._events);
    }
  }, {
    key: "emit",
    value: function emit(eventName) {
      var _this$_emitter;

      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_this$_emitter = this._emitter).emit.apply(_this$_emitter, [eventName].concat(args));
    }
  }, {
    key: "on",
    value: function on(event, listener) {
      this._emitter.on(event, listener);
    }
  }, {
    key: "removeListener",
    value: function removeListener(event, listener) {
      this._emitter.off(event, listener);
    }
  }, {
    key: "removeAllListeners",
    value: function removeAllListeners() {
      var _this = this;

      Object.keys(this._events).forEach(function (evt) {
        var listeners = _this._events[evt];
        listeners.forEach(function (listener) {
          return _this._emitter.off(evt, listener);
        });
      });
    }
  }]);

  return Emitter;
}();

/***/ }),

/***/ "./src/utils/gsap.js":
/*!***************************!*\
  !*** ./src/utils/gsap.js ***!
  \***************************/
/*! exports provided: has, ensure, loadFromCDN, transformOrigins, generateTimeline, killTimeline, isTimeline, isTween */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "has", function() { return has; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ensure", function() { return ensure; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "loadFromCDN", function() { return loadFromCDN; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "transformOrigins", function() { return transformOrigins; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateTimeline", function() { return generateTimeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "killTimeline", function() { return killTimeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTimeline", function() { return isTimeline; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTween", function() { return isTween; });
/* harmony import */ var _config_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/config */ "./src/config/config.js");
/* harmony import */ var _loadscript__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./loadscript */ "./src/utils/loadscript.js");
/* harmony import */ var _group_timeline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../group/timeline */ "./src/group/timeline.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







/**
 * Check on GSAP presence
 *
 * @returns {boolean}
 */

function has() {
  return Object(_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.tween) && Object(_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline);
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
  } // has gsap on window object?


  var wTween = window.TweenMax || window.TweenLite;
  var wTimeline = window.TimelineMax || window.TimelineLite;

  if (Object(_context__WEBPACK_IMPORTED_MODULE_5__["isBrowser"])() && Object(_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(wTween) && Object(_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(wTimeline)) {
    _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.tween = wTween;
    _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline = wTimeline;
    return Promise.resolve();
  } // load from cdn


  if (!_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInject) {
    if (Object(_debug__WEBPACK_IMPORTED_MODULE_3__["default"])()) {
      console.warn("\n      \n        It seems that you've disabled autoInject. GSAP cannot be found or loaded by Spirit.\n        Please make sure you provide the tween and timeline to Spirit:\n      \n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n        \n        Or enable the autoInject \"spirit.config.gsap.autoInject = true\".\n        \n      ");
    }

    return Promise.reject(new Error('GSAP not found.'));
  }

  if (Object(_debug__WEBPACK_IMPORTED_MODULE_3__["default"])()) {
    console.warn("\n      \n      GSAP is being fetched from CDN: ".concat(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInjectUrl, ".\n      If you already have GSAP installed, please provide it to Spirit:\n      \n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n      \n      You want to use another cdn? Change it here:\n       \n        spirit.config.gsap.autoInjectUrl = 'https://cdn.xxx'\n      \n    "));
  }

  return this.loadFromCDN();
}
/**
 * Load GSAP from CDN based on autoInjectUrl
 *
 * @return {Promise<void>}
 */

function loadFromCDN() {
  return Object(_loadscript__WEBPACK_IMPORTED_MODULE_1__["default"])(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.autoInjectUrl).then(function () {
    _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.tween = window.TweenMax;
    _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline = window.TimelineMax;
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
  }) || []; // add start 50% 50% ?

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

  var tl = new _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline({
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
      var _keyframe = keyframe,
          value = _keyframe.value,
          ease = _keyframe.ease,
          time = _keyframe.time;
      var prev = keyframe.prev();
      var start = prev ? prev.time : 0;
      var duration = prev ? time - prev.time : time;
      var props = {
        ease: ease || 'Linear.easeNone'
      };

      var property = _defineProperty({}, prop.name, value); // parse dots into recursive object


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

      props = _objectSpread({}, props, {}, property);

      if (time === 0) {
        props.immediateRender = true;
      }

      if (prop.isCSSTransform() && origin && time >= origin.time) {
        props.transformOrigin = origin.value;
        origin = origins.next().current;
      }

      tl.to(timeline.transformObject, duration, props, start);
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
  if (isTimeline(gsapTimeline)) {
    gsapTimeline.eventCallback('onComplete', null);
    gsapTimeline.eventCallback('onUpdate', null);
    gsapTimeline.eventCallback('onStart', null);
    var targets = gsapTimeline.getChildren();
    gsapTimeline.kill();

    for (var i = 0; i < targets.length; i++) {
      if (isTimeline(targets[i])) {
        killTimeline(targets[i]);
        continue;
      }

      if (targets[i].target !== null) {
        _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.tween.set(targets[i].target, {
          clearProps: 'all'
        });
      }
    }

    gsapTimeline.clear();
  }

  return gsapTimeline;
}
function isTimeline(timeline) {
  return timeline && Object(_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline) && timeline instanceof _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.timeline;
}
function isTween(tween) {
  return tween && Object(_is__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(_config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.tween) && tween instanceof _config_config__WEBPACK_IMPORTED_MODULE_0__["default"].gsap.tween;
}

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: context, gsap, events, convert, xpath, is, emitter, loadscript, jsonloader, autobind, debug, resolver */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "context", function() { return _context__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _gsap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gsap */ "./src/utils/gsap.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "gsap", function() { return _gsap__WEBPACK_IMPORTED_MODULE_1__; });
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./events */ "./src/utils/events.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "events", function() { return _events__WEBPACK_IMPORTED_MODULE_2__; });
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./convert */ "./src/utils/convert.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "convert", function() { return _convert__WEBPACK_IMPORTED_MODULE_3__; });
/* harmony import */ var _xpath__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./xpath */ "./src/utils/xpath.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "xpath", function() { return _xpath__WEBPACK_IMPORTED_MODULE_4__; });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "is", function() { return _is__WEBPACK_IMPORTED_MODULE_5__; });
/* harmony import */ var _emitter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./emitter */ "./src/utils/emitter.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "emitter", function() { return _emitter__WEBPACK_IMPORTED_MODULE_6__; });
/* harmony import */ var _resolver__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./resolver */ "./src/utils/resolver.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "resolver", function() { return _resolver__WEBPACK_IMPORTED_MODULE_7__; });
/* harmony import */ var _loadscript__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./loadscript */ "./src/utils/loadscript.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "loadscript", function() { return _loadscript__WEBPACK_IMPORTED_MODULE_8__["default"]; });

/* harmony import */ var _jsonloader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./jsonloader */ "./src/utils/jsonloader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jsonloader", function() { return _jsonloader__WEBPACK_IMPORTED_MODULE_9__["default"]; });

/* harmony import */ var _autobind__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./autobind */ "./src/utils/autobind.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "autobind", function() { return _autobind__WEBPACK_IMPORTED_MODULE_10__["default"]; });

/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "debug", function() { return _debug__WEBPACK_IMPORTED_MODULE_11__["default"]; });















/***/ }),

/***/ "./src/utils/is.js":
/*!*************************!*\
  !*** ./src/utils/is.js ***!
  \*************************/
/*! exports provided: isObject, isSVG, isFunction, isNumeric */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isSVG", function() { return isSVG; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isNumeric", function() { return isNumeric; });
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
/*! exports provided: req, cache, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "req", function() { return req; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cache", function() { return cache; });
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

/* harmony default export */ __webpack_exports__["default"] = (function (url) {
  // only run in browser
  if (!Object(_context__WEBPACK_IMPORTED_MODULE_0__["isBrowser"])()) {
    return Promise.reject(new Error('Invalid context. jsonLoader can only be used in browser.'));
  } // serve from cache


  if (url in cache) {
    return Promise.resolve(cache[url]);
  } // serve from queued promise


  if (url in req) {
    return req[url];
  } // create promise request


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
          reject(new Error("jsonLoader: Invalid json for request ".concat(url)));
        }
      }
    };

    try {
      xmlhttp.open('GET', encodeURI(url), true);
      xmlhttp.send();
    } catch (err) {
      reject(new Error("Could not open request. Unable to load ".concat(url)));
    }
  }); // store request

  if (!req[url]) {
    req[url] = promise;
  } // send back the promise


  return promise;
});

/***/ }),

/***/ "./src/utils/loadscript.js":
/*!*********************************!*\
  !*** ./src/utils/loadscript.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return loadScript; });
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./context */ "./src/utils/context.js");

/**
 * Load script into web page context
 * .
 * @param   {string} src script source
 * @returns {Promise}
 */

function loadScript(src) {
  if (!Object(_context__WEBPACK_IMPORTED_MODULE_0__["isBrowser"])()) {
    return Promise.reject(new Error("Script can only be loaded in the browser: ".concat(src)));
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
      reject(new Error("Could not load script ".concat(src)));
    };

    document.body.appendChild(s);
  });
}

/***/ }),

/***/ "./src/utils/polyfill.js":
/*!*******************************!*\
  !*** ./src/utils/polyfill.js ***!
  \*******************************/
/*! exports provided: includes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "includes", function() { return includes; });
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
/*! exports provided: resolveElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolveElement", function() { return resolveElement; });
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");
/* harmony import */ var _xpath__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xpath */ "./src/utils/xpath.js");


/**
 * Resolve element relative to root
 *
 * @param {Element}       root
 * @param {{ path, id }}  data
 * @param {boolean}       throwException
 */

function resolveElement(root, data) {
  var throwException = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var transformObject = null;
  var path = data.path,
      id = data.id;

  if (id) {
    transformObject = root.querySelector("[data-spirit-id=\"".concat(id, "\"]"));
  }

  if (!transformObject && path) {
    transformObject = _xpath__WEBPACK_IMPORTED_MODULE_1__["getElement"](path, root === document.body ? undefined : root);
  }

  if (!transformObject) {
    if (Object(_debug__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
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
/*! exports provided: getExpression, getElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getExpression", function() { return getExpression; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getElement", function() { return getElement; });
/* harmony import */ var _is__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./is */ "./src/utils/is.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./debug */ "./src/utils/debug.js");


/**
 * Get DOM representation for an element.
 *
 * @param   {Element}              element
 * @param   {null|undefined|Node}  nodeContext
 * @returns {string|null}
 */

function getExpression(element) {
  var nodeContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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
    var pathIndex = "[".concat(index + 1, "]");

    if (Object(_is__WEBPACK_IMPORTED_MODULE_0__["isSVG"])(element)) {
      tagName = "*[local-name()='".concat(tagName, "']");
    }

    paths.unshift(tagName + pathIndex);
    element = element.parentNode;
  }

  if (paths.length === 0) {
    return null;
  }

  return nodeContext ? paths.join('/') : "/".concat(paths.join('/'));
}
/**
 * Get an element from expression
 *
 * @param   {string} expression
 * @param   {Node}   nodeContext
 * @returns {Node|null}
 */

function getElement(expression) {
  var nodeContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!nodeContext) {
    nodeContext = document.body || document.documentElement;
  }

  try {
    var evaluated = document.evaluate(expression, nodeContext, null, window.XPathResult.ANY_TYPE, null);
    return evaluated.iterateNext();
  } catch (err) {
    if (Object(_debug__WEBPACK_IMPORTED_MODULE_1__["default"])()) {
      console.error('Cannot get element from expression: ', expression);
      console.error(err.stack);
    }
  }

  return null;
}

/***/ })

/******/ })["default"];
//# sourceMappingURL=spirit.js.map