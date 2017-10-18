/*!
 * Spirit.js v2.0.1
 * (c) 2017 Patrick Brouwer
 * Released under the MIT License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("spirit", [], factory);
	else if(typeof exports === 'object')
		exports["spirit"] = factory();
	else
		root["spirit"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.debug = exports.autobind = exports.jsonloader = exports.loadscript = exports.emitter = exports.is = exports.xpath = exports.convert = exports.events = exports.gsap = exports.context = undefined;

var _context = __webpack_require__(4);

var context = _interopRequireWildcard(_context);

var _gsap = __webpack_require__(26);

var gsap = _interopRequireWildcard(_gsap);

var _events = __webpack_require__(25);

var events = _interopRequireWildcard(_events);

var _convert = __webpack_require__(23);

var convert = _interopRequireWildcard(_convert);

var _xpath = __webpack_require__(28);

var xpath = _interopRequireWildcard(_xpath);

var _is = __webpack_require__(6);

var is = _interopRequireWildcard(_is);

var _emitter = __webpack_require__(5);

var emitter = _interopRequireWildcard(_emitter);

var _loadscript = __webpack_require__(18);

var _loadscript2 = _interopRequireDefault(_loadscript);

var _jsonloader = __webpack_require__(27);

var _jsonloader2 = _interopRequireDefault(_jsonloader);

var _autobind = __webpack_require__(22);

var _autobind2 = _interopRequireDefault(_autobind);

var _debug = __webpack_require__(8);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.context = context;
exports.gsap = gsap;
exports.events = events;
exports.convert = convert;
exports.xpath = xpath;
exports.is = is;
exports.emitter = emitter;
exports.loadscript = _loadscript2.default;
exports.jsonloader = _jsonloader2.default;
exports.autobind = _autobind2.default;
exports.debug = _debug2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = __webpack_require__(3);

var _is = __webpack_require__(6);

var is = _interopRequireWildcard(_is);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * List
 *
 * @fires List#add
 * @fires List#remove
 * @fires List#change:list
 */
var List = function (_EventEmitter) {
  _inherits(List, _EventEmitter);

  /**
   * Create List
   *
   * @param {Array}           items
   * @param {*}               model
   * @param {Array|undefined} defaultModelArgs
   */
  function List() {
    var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var model = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var defaultModelArgs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;

    _classCallCheck(this, List);

    var _this = _possibleConstructorReturn(this, (List.__proto__ || Object.getPrototypeOf(List)).call(this));

    _this._list = [];
    _this._model = null;
    _this._duplicates = true;
    _this._sortOn = false;
    _this._linkedList = false;

    _this.setMaxListeners(Infinity);

    _this._model = model;

    if (model) {
      var testProto = defaultModelArgs !== undefined ? new (Function.prototype.bind.apply(model, [null].concat(_toConsumableArray(defaultModelArgs))))() // eslint-disable-line new-cap
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
          if (is.isObject(item) && typeof model.fromObject === 'function') {
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


  _createClass(List, [{
    key: 'checkOnDuplicates',


    /**
     * Check current list on duplicates
     */
    value: function checkOnDuplicates() {
      var dup = this._duplicates;
      var uniq = false;
      var isProp = false;

      // check based on boolean
      if (typeof dup === 'boolean' && dup === false) {
        uniq = this.list.map(function (item) {
          return { count: 1, item: item };
        }).reduce(function (a, b) {
          a[b.item] = (a[b.item] || 0) + b.count;
          return a;
        }, {});
      }

      // check based on object property
      if (is.isObject(dup) && dup.hasOwnProperty('prop')) {
        isProp = true;

        uniq = this.list.map(function (item) {
          return { count: 1, prop: item[dup.prop] };
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

        var p = isProp ? dup.prop + ': ' + prop : false;

        var m = this._model ? this.constructor.name + ' > ' + this._model.name + ' > { ' + p + ' }' : false;

        throw new Error('List has duplicates. ' + m);
      }
    }

    /**
     * Get the sort type of this list
     *
     * @returns {boolean|string}
     */

  }, {
    key: 'sort',


    /**
     * Sort list based on sort type
     */
    value: function sort() {
      var so = this._sortOn;

      // sort on primitives
      if (typeof so === 'boolean' && so === true) {
        this._list = this._list.sort();
      }

      // sort on property
      if (typeof so === 'string') {
        this._list = this._list.sort(function (a, b) {
          return a[so] - b[so];
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
     */

  }, {
    key: 'linkItems',


    /**
     * Link items to each other as a linked list based on sortOn
     * if this list is setup as a linked list
     */
    value: function linkItems() {
      if (this._linkedList) {
        for (var i = 0; i < this._list.length; i++) {
          if (is.isObject(this._list[i])) {
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
    key: 'at',


    /**
     * Get the value at index
     *
     * @param   {number} index
     * @returns {*}
     */
    value: function at(index) {
      if (index >= this._list.length) {
        throw new Error('Index exceeded. Requested ' + index + ', have length of ' + this.length);
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
    key: 'add',
    value: function add(item) {
      var _this2 = this;

      var result = null;

      var addSingle = function addSingle(i) {
        var newItem = void 0;

        if (_this2._model) {
          if (i instanceof _this2._model) {
            newItem = i;
            newItem._list = _this2;
            if (newItem.setupBubbleEvents && typeof newItem.setupBubbleEvents === 'function') {
              newItem.setupBubbleEvents();
            }
          } else if (is.isObject(i) && typeof _this2._model.fromObject === 'function') {
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
    key: 'remove',
    value: function remove(item) {
      var _this3 = this;

      var result = null;

      var removeSingle = function removeSingle(i) {
        var doRemove = function doRemove(ins) {
          var index = _this3._list.indexOf(ins);
          if (index > -1) {
            _this3._list.splice(index, 1);

            if (ins._list && ins._list instanceof List) {
              ins._list = null;
            }

            if (is.isObject(ins)) {
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
    key: 'clear',
    value: function clear() {
      this.each(this.remove.bind(this));
    }

    /**
     * Walk over each item
     *
     * @returns {*}
     */

  }, {
    key: 'each',
    value: function each(cb) {
      var list = [].concat(_toConsumableArray(this.list));
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
    key: 'toArray',
    value: function toArray() {
      var l = this._model ? this.list.map(function (item) {
        return item.toObject();
      }) : this.list;

      return l.reduce(function (a, b) {
        if (is.isObject(b)) {
          var obj = _extends({}, b);
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
    key: 'duplicates',
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
    key: 'sortOn',
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
    key: 'linkedList',
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
    key: 'list',
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
    key: 'length',
    get: function get() {
      return this.list.length;
    }
  }]);

  return List;
}(_events.EventEmitter);

List.Events = ['change:list', 'add', 'remove'];

exports.default = List;
module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function Config() {
  _classCallCheck(this, Config);

  this.debug = true;
  this.gsap = {
    tween: null,
    timeline: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap/src/minified/TweenMax.min.js'
  };
};

exports.default = new Config();
module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowser = isBrowser;
function isBrowser() {
  return 'window' in global && 'document' in global;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(29)))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
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

exports.emitChange = emitChange;

var _events = __webpack_require__(3);

var _list3 = __webpack_require__(1);

var _list4 = _interopRequireDefault(_list3);

var _is = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Setter deco
 *
 * @param   {EventEmitter}  target
 * @param   {string}        key
 * @param   {object}        descriptor
 * @returns {object}
 */
var setter = function setter(target, key, descriptor) {
  var fn = descriptor.set;

  if (!_events.EventEmitter.prototype.isPrototypeOf(target) && !_events.EventEmitter.prototype.isPrototypeOf(target.prototype)) {
    throw new Error('@emitter.emitChange can only be applied to event emitters');
  }

  return _extends({}, descriptor, {
    configurable: true,
    set: function set(val) {
      var _this = this;

      var toObj = function toObj(v) {
        return (0, _is.isFunction)(_this.toObject) ? _this.toObject() : _defineProperty({}, key, v !== undefined ? v : val);
      };

      // get previous value
      var prev = this['_' + key];
      if (prev && typeof prev.toArray === 'function') {
        prev = prev.toArray();
      } else if (prev && typeof prev.toObject === 'function') {
        prev = prev.toObject();
      }

      var previous = void 0;

      if (prev !== val) {
        previous = toObj(prev);
      }

      // call class setter method
      fn.call(this, val);

      // is a duplicate on list?
      if (this._list instanceof _list4.default && this._list._duplicates !== true) {
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

      var from = prev && (0, _is.isFunction)(prev.toObject) ? prev.toObject() : prev;

      var to = val && (0, _is.isFunction)(val.toObject) ? val.toObject() : val;

      var changed = { type: key, from: from, to: to };

      var current = void 0;
      try {
        current = toObj();
      } catch (err) {
        current = _defineProperty({}, key, val);
      }

      var evtParams = { previous: previous, current: current, changed: changed };

      var evtChange = ['change', evtParams];
      var evtChangeProp = ['change:' + key, evtParams, val];

      this.emit.apply(this, evtChange);
      this.emit.apply(this, evtChangeProp);

      if (this._list && this._list instanceof _events.EventEmitter) {
        var _list, _list2;

        (_list = this._list).emit.apply(_list, evtChange);
        (_list2 = this._list).emit.apply(_list2, evtChangeProp);
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
function emitChange(prop) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var validators = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (prop) {
    // bind as class
    return function (target) {
      var _Object$definePropert;

      // setup class prototype
      Object.defineProperties(target.prototype, (_Object$definePropert = {}, _defineProperty(_Object$definePropert, '_' + prop, {
        value: defaultValue,
        writable: true,
        enumerable: false,
        configurable: true
      }), _defineProperty(_Object$definePropert, prop, {
        configurable: true,
        get: function get() {
          return this['_' + prop];
        },
        set: function set(val) {
          var errors = validators.reduce(function (res, v) {
            if (!v.validator(val)) {
              res.push(v.message);
            }
            return res;
          }, []);

          if (errors.length > 0) {
            throw new Error('' + errors[0]);
          }

          this['_' + prop] = val;
        }
      }), _Object$definePropert));

      // apply setter on it
      var descriptor = Object.getOwnPropertyDescriptor(target.prototype, prop);
      Object.defineProperty(target.prototype, prop, setter(target, prop, descriptor));
    };
  }

  // bind as setter
  return setter;
}

/***/ },
/* 6 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isObject = isObject;
exports.isSVG = isSVG;
exports.isFunction = isFunction;
function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

function isSVG(element) {
  return element instanceof window.SVGElement;
}

function isFunction(fn) {
  return typeof fn === 'function';
}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _props = __webpack_require__(16);

var _props2 = _interopRequireDefault(_props);

var _utils = __webpack_require__(0);

var _evalmap = __webpack_require__(10);

var _evalmap2 = _interopRequireDefault(_evalmap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Timeline.
 */
var Timeline = function () {

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


  /**
   * Identifier to select element. Override the path for resolving transformObject.
   * By default the id is set on element attribute [data-spirit-id].
   *
   * @type {string|null}
   */


  /**
   * Defined label representing this timeline node.
   *
   * @type {string|null}
   */


  /**
   * Timeline type.
   * Can be "dom" or "object"
   *
   * @type {string}
   */
  function Timeline() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dom';
    var transformObject = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _props2.default();
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var label = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, Timeline);

    this.type = 'dom';
    this.transformObject = null;
    this.label = null;
    this.path = null;
    this.id = null;
    this.props = null;

    if (!(props instanceof _props2.default)) {
      props = new _props2.default(props);
    }

    Object.assign(this, {
      type: type,
      transformObject: transformObject,
      props: props,
      label: label,
      path: path,
      id: id
    });

    if (type === 'dom') {
      if (!transformObject || _utils.context.isBrowser() && !(transformObject instanceof window.Element)) {
        throw new Error('transformObject needs to be an element.');
      }

      if (!id && !path) {
        throw new Error('path is not defined');
      }
    }

    if (type === 'object') {
      if (!transformObject) {
        throw new Error('transformObject needs to be an object');
      }
    }

    this.props.mappings = [new _evalmap2.default(/this/g, transformObject)];
  }

  /**
   * Properties for this timeline.
   *
   * @type {Props}
   */


  /**
   * XPath of element, normalized by group element.
   * Only relevant if type is "dom"
   *
   * @type {string|null}
   */


  /**
   * Object to apply transforms on.
   * If type is "dom" it refers to a HTMLElement else a plain javascript object
   *
   * @type {HTMLElement|Object}
   */


  _createClass(Timeline, [{
    key: 'toObject',
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
    key: 'destroy',
    value: function destroy() {
      if (this.props instanceof _props2.default) {
        this.props.each(function (tr) {
          return tr.destroy();
        });
      }
    }
  }]);

  return Timeline;
}();

Timeline.fromObject = function (obj) {
  if (!_utils.is.isObject(obj)) {
    throw new Error('Object is invalid.');
  }

  var keys = Object.keys(obj);

  if (!keys.includes('transformObject')) {
    throw new Error('Object is invalid');
  }

  var args = _utils.convert.objectToArray(obj).filter(function (arg) {
    return arg !== undefined;
  });
  args = _extends({
    type: args.type || 'dom',
    props: {}
  }, _utils.convert.arrayToObject(args));

  return new Timeline(args.type, args.transformObject, args.props, args.path || undefined, args.id || undefined, args.label || undefined);
};

exports.default = Timeline;
module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _context = __webpack_require__(4);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var debug = function debug() {
  return "development" === 'development' && (0, _context.isBrowser)() && Boolean(_config2.default.debug);
};
exports.default = debug;
module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _group = __webpack_require__(12);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Registry = function (_List) {
  _inherits(Registry, _List);

  function Registry() {
    _classCallCheck(this, Registry);

    return _possibleConstructorReturn(this, (Registry.__proto__ || Object.getPrototypeOf(Registry)).call(this, []));
  }

  /**
   * Add unique group
   *
   * @param {Group} group
   */


  _createClass(Registry, [{
    key: 'add',
    value: function add(group) {
      if (!(group instanceof _group.Group)) {
        throw new Error('Invalid group. Only Group instances allowed.');
      }

      if (!this.groupNames().includes(group.name)) {
        if ((0, _utils.debug)()) {
          console.warn('registry.add() Group "' + group.name + '" added to registry (spirit.groups) and can be resolved by Spirit app');
        }
        _get(Registry.prototype.__proto__ || Object.getPrototypeOf(Registry.prototype), 'add', this).call(this, group);
      } else {
        if ((0, _utils.debug)()) {
          console.warn('registry.add() Group "' + group.name + '" already exist in registry. Skip registry (spirit.groups)');
        }
      }
    }

    /**
     * Get group by name
     *
     * @param   {string} name
     * @returns {Group}
     */

  }, {
    key: 'get',
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
    key: 'groupNames',
    value: function groupNames() {
      return this.list.map(function (g) {
        return g.name;
      });
    }
  }]);

  return Registry;
}(_list2.default);

exports.default = new Registry();
module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

  Object.assign(this, { regex: regex, map: map });
};

exports.default = EvalMap;
module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _desc, _value, _class;

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _utils = __webpack_require__(0);

var _timelines = __webpack_require__(17);

var _timelines2 = _interopRequireDefault(_timelines);

var _events = __webpack_require__(3);

var _emitter = __webpack_require__(5);

var _errors = __webpack_require__(24);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

/**
 * Group.
 */
var Group = (_dec = (0, _emitter.emitChange)(), _dec2 = (0, _emitter.emitChange)(), _dec3 = (0, _emitter.emitChange)(), _dec4 = (0, _emitter.emitChange)(), (_class = function (_EventEmitter) {
  _inherits(Group, _EventEmitter);

  /**
   * Create a group instance.
   *
   * @param {object} props
   */
  function Group() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Group);

    var _this = _possibleConstructorReturn(this, (Group.__proto__ || Object.getPrototypeOf(Group)).call(this));

    _this._name = 'untitled';
    _this._timeScale = 1;
    _this._timelines = new _timelines2.default();
    _this.timeline = null;

    _this.setMaxListeners(Infinity);

    if (!props.name || typeof props.name !== 'string' || props.name.trim() === '') {
      throw new Error('Cannot create group without a name.');
    }

    var defaults = {
      name: 'untitled',
      timeScale: 1,
      timelines: new _timelines2.default()
    };

    Object.assign(_this, _extends({}, defaults, props));
    return _this;
  }

  /**
   * Get timelines
   *
   * @returns {Timelines}
   */


  _createClass(Group, [{
    key: 'toObject',


    /**
     * Convert group to object
     *
     * @returns {object}
     */
    value: function toObject() {
      var name = this.name;
      var timeScale = this.timeScale;
      var timelines = this.timelines.toArray();

      return { name: name, timeScale: timeScale, timelines: timelines };
    }
  }, {
    key: 'reset',
    value: function reset() {
      if (this.timeline) {
        _utils.gsap.killTimeline(this.timeline);
      }
    }

    /**
     * Construct gsap timeline
     *
     * @returns {TimelineMax|TimelineLite}
     */

  }, {
    key: 'construct',
    value: function construct() {
      var _this2 = this;

      try {
        if (!_config2.default.gsap.timeline || !_config2.default.gsap.tween) {
          if ((0, _utils.debug)()) {
            console.warn('\n            Trying to construct group ' + this.name + ', but GSAP cannot be found.\n            \n            Did you forgot to call spirit.setup() perhaps?\n            \n            @usage\n                \n                spirit.setup().then(function(){\n                  // gsap is loaded here..\n                })\n                \n            or provide gsap instances manually:\n            \n                spirit.setup({ \n                  tween:    TweenLite,\n                  timeline: TimelineLite\n                }).then(function(){\n                  // gsap is loaded here..\n                })\n                \n          ');
          }
          throw new Error('GSAP cannot be found');
        }

        // initiate an empty GSAP timeline
        if (this.timeline && this.timeline instanceof _config2.default.gsap.timeline) {
          _utils.gsap.killTimeline(this.timeline);
        } else {
          this.timeline = new _config2.default.gsap.timeline({ paused: true }); // eslint-disable-line new-cap
        }

        // create a valid GSAP timeline out of timelines
        this.timelines.each(function (timeline) {
          if (timeline.type === 'dom') {
            var el = timeline.transformObject;
            if (!(el instanceof window.Element)) {
              throw new _errors.TimelineError('transformObject is not an Element', el);
            }
            try {
              _this2.timeline.add(_utils.gsap.generateTimeline(timeline).play(), 0, 'start');
            } catch (err) {
              throw new _errors.TimelineError(err.message, el, err.stack);
            }
          }
        });

        // update timescale
        this.timeline.timeScale(this.timeScale);
        this._duration = this.timeline.duration();
      } catch (err) {
        err.message = 'Could not construct timeline: ' + err.message;
        throw err;
      }

      this.emit('construct', this.timeline);
      return this.timeline;
    }
  }, {
    key: 'timelines',
    get: function get() {
      return this._timelines;
    }

    /**
     * Set timelines
     *
     * @param {Timelines} timelines
     */
    ,
    set: function set(timelines) {
      if (!(timelines instanceof _timelines2.default)) {
        timelines = new _timelines2.default(Array.from(timelines));
      }
      this._timelines = timelines;
    }

    /**
     * Get current timeScale
     *
     * @returns {number}
     */

  }, {
    key: 'timeScale',
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

      if (this.timeline && this.timeline instanceof _config2.default.gsap.timeline) {
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
    key: 'duration',
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
      if (this.timeline && this.timeline instanceof _config2.default.gsap.timeline) {
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
    key: 'name',
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
}(_events.EventEmitter), (_applyDecoratedDescriptor(_class.prototype, 'timelines', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'timelines'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'timeScale', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'timeScale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'duration', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'duration'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'name', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'name'), _class.prototype)), _class));


Group.fromObject = function (obj) {
  return new Group(obj);
};

exports.default = Group;
module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Timelines = exports.Timeline = exports.Props = exports.Prop = exports.Keyframes = exports.Keyframe = exports.Groups = exports.Group = exports.EvalMap = undefined;

var _evalmap = __webpack_require__(10);

var _evalmap2 = _interopRequireDefault(_evalmap);

var _group = __webpack_require__(11);

var _group2 = _interopRequireDefault(_group);

var _groups = __webpack_require__(21);

var _groups2 = _interopRequireDefault(_groups);

var _keyframe = __webpack_require__(13);

var _keyframe2 = _interopRequireDefault(_keyframe);

var _keyframes = __webpack_require__(14);

var _keyframes2 = _interopRequireDefault(_keyframes);

var _prop = __webpack_require__(15);

var _prop2 = _interopRequireDefault(_prop);

var _props = __webpack_require__(16);

var _props2 = _interopRequireDefault(_props);

var _timeline = __webpack_require__(7);

var _timeline2 = _interopRequireDefault(_timeline);

var _timelines = __webpack_require__(17);

var _timelines2 = _interopRequireDefault(_timelines);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.EvalMap = _evalmap2.default;
exports.Group = _group2.default;
exports.Groups = _groups2.default;
exports.Keyframe = _keyframe2.default;
exports.Keyframes = _keyframes2.default;
exports.Prop = _prop2.default;
exports.Props = _props2.default;
exports.Timeline = _timeline2.default;
exports.Timelines = _timelines2.default;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

var _events = __webpack_require__(3);

var _utils = __webpack_require__(0);

var _emitter = __webpack_require__(5);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

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

var Keyframe = (_dec = (0, _emitter.emitChange)('time', null, [{ validator: function validator(val) {
    return typeof val === 'number';
  }, message: 'Time must be a number' }]), _dec2 = (0, _emitter.emitChange)('ease', null), _dec3 = (0, _emitter.emitChange)(), _dec(_class = _dec2(_class = (_class2 = function (_EventEmitter) {
  _inherits(Keyframe, _EventEmitter);

  /**
   * Keyframe.
   *
   * @param {number}  time    position (in seconds) on timeline
   * @param {*}       value   value assigned
   * @param {string}  ease    easing value (optional)
   */
  function Keyframe(time, value) {
    var ease = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, Keyframe);

    var _this = _possibleConstructorReturn(this, (Keyframe.__proto__ || Object.getPrototypeOf(Keyframe)).call(this));

    _this._list = null;
    _this._value = null;
    _this.mappings = [];

    _this.setMaxListeners(Infinity);

    ease = ease || null;

    Object.assign(_this, { time: time, value: value, ease: ease });
    return _this;
  }

  /**
   * Get next keyframe (linked list)
   *
   * @returns {Keyframe|null}
   */


  _createClass(Keyframe, [{
    key: 'next',
    value: function next() {
      return this._next;
    }

    /**
     * Get previous keyframe (linked list)
     *
     * @returns {Keyframe|null}
     */

  }, {
    key: 'prev',
    value: function prev() {
      return this._prev;
    }
  }, {
    key: 'isEval',


    /**
     * Check if current keyframe has an evaluable value
     *
     * @returns {boolean}
     */
    value: function isEval() {
      return (/{(.*?)}/.test(this._value)
      );
    }

    /**
     * Convert to readable object
     *
     * @param   {boolean} ignoreEval
     * @returns {object} { "0.2s": { value: 10, ease: "Linear.easeNone" }}
     */

  }, {
    key: 'toObject',
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var value = void 0;

      try {
        value = ignoreEval ? this._value : this.value;
      } catch (err) {
        value = this._value;
      }

      return _defineProperty({}, this.time + 's', { value: value, ease: this.ease });
    }

    /**
     * Destroy events
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      _utils.events.clearEvents(this, Keyframe.Events);
    }
  }, {
    key: 'value',
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
          val = val.replace(mappings[mapping].regex, 'mappings[' + mapping + '].map');
        }

        var res = void 0;

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
    },
    set: function set(val) {
      this._value = val;
    }

    /**
     * Get the list where this keyframe is added to
     *
     * @returns {Keyframes|null}
     */

  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }
  }]);

  return Keyframe;
}(_events.EventEmitter), (_applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class);

/**
 * Create keyframe instance from object
 *
 * @example { "0.2s": { value: 10, ease: "Linear.easeNone" }}
 * @param   {object} obj
 * @returns {Keyframe}
 */

Keyframe.fromObject = function (obj) {
  if (!_utils.is.isObject(obj)) {
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


  if (!_utils.is.isObject(obj[time]) && (typeof obj[time] === 'string' || typeof obj[time] === 'number')) {
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

exports.default = Keyframe;
module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _keyframe = __webpack_require__(13);

var _keyframe2 = _interopRequireDefault(_keyframe);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Keyframes = function (_List) {
  _inherits(Keyframes, _List);

  /**
   * Create keyframes
   *
   * @constructor
   * @param {Array|object} keyframes
   */
  function Keyframes() {
    var keyframes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Keyframes);

    if (_utils.is.isObject(keyframes)) {
      keyframes = _utils.convert.objectToArray(keyframes);
    }

    var _this = _possibleConstructorReturn(this, (Keyframes.__proto__ || Object.getPrototypeOf(Keyframes)).call(this, keyframes, _keyframe2.default, [0, 0]));

    _this.duplicates = { prop: 'time' };
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
    key: 'add',
    value: function add(keyframe) {
      var _this2 = this;

      if (_utils.is.isObject(keyframe) && !(keyframe instanceof _keyframe2.default) && Object.keys(keyframe).length > 1) {
        keyframe = _utils.convert.objectToArray(keyframe);
      }

      var affected = _get(Keyframes.prototype.__proto__ || Object.getPrototypeOf(Keyframes.prototype), 'add', this).call(this, keyframe);
      var exec = function exec(keyframe) {
        keyframe.mappings = [].concat(_toConsumableArray(_this2.mappings));
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
    key: 'remove',
    value: function remove(keyframe) {
      var affected = _get(Keyframes.prototype.__proto__ || Object.getPrototypeOf(Keyframes.prototype), 'remove', this).call(this, keyframe);
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
    key: 'get',


    /**
     * Get keyframe at time
     *
     * @param   {string} time
     * @returns {Keyframe}
     */
    value: function get(time) {
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
     */

  }, {
    key: 'toObject',
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      return this.list.reduce(function (obj, keyframe) {
        return _extends({}, obj, keyframe.toObject(ignoreEval));
      }, {});
    }

    /**
     * Destroy events
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.each(function (keyframe) {
        return keyframe.destroy();
      });
      _utils.events.clearEvents(this, Keyframes.Events);
    }
  }, {
    key: 'mappings',
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
        keyframe.mappings = [].concat(_toConsumableArray(mappings));
      });
    }
  }]);

  return Keyframes;
}(_list2.default);

Keyframes.Events = ['change:list', 'add', 'remove', 'change', 'change:time', 'change:value', 'change:ease'];

exports.default = Keyframes;
module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

var _events = __webpack_require__(3);

var _keyframes = __webpack_require__(14);

var _keyframes2 = _interopRequireDefault(_keyframes);

var _utils = __webpack_require__(0);

var _emitter = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

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

var Prop = (_dec = (0, _emitter.emitChange)('name', null, [{ validator: function validator(val) {
    return typeof val === 'string';
  }, message: 'Name must be a string' }, { validator: function validator(val) {
    return !/^\d+\.?\d*?$/.test(val);
  }, message: 'Name must be a string' }]), _dec2 = (0, _emitter.emitChange)(), _dec(_class = (_class2 = function (_EventEmitter) {
  _inherits(Prop, _EventEmitter);

  /**
   * Property.
   *
   * @param {string} name
   * @param {object|Keyframes|Array} keyframes
   */
  function Prop(name) {
    var keyframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _keyframes2.default();

    _classCallCheck(this, Prop);

    var _this = _possibleConstructorReturn(this, (Prop.__proto__ || Object.getPrototypeOf(Prop)).call(this));

    _this._keyframes = null;
    _this._list = null;

    _this.setMaxListeners(Infinity);

    if (!(keyframes instanceof _keyframes2.default)) {
      keyframes = new _keyframes2.default(keyframes);
    }

    name = name || null;

    Object.assign(_this, { name: name, keyframes: keyframes });
    return _this;
  }

  /**
   * Get next property (linked list)
   *
   * @returns {Prop|null}
   */


  _createClass(Prop, [{
    key: 'next',
    value: function next() {
      return this._next;
    }

    /**
     * Get previous property (linked list)
     *
     * @returns {Prop|null}
     */

  }, {
    key: 'prev',
    value: function prev() {
      return this._prev;
    }

    /**
     * Get the list where this prop is added to
     *
     * @returns {Props|null}
     */

  }, {
    key: 'setupBubbleEvents',


    /**
     * Bubble events from keyframes
     */
    value: function setupBubbleEvents() {
      var _this2 = this;

      if (this._keyframes instanceof _keyframes2.default) {
        _utils.events.clearEvents(this._keyframes, _keyframes2.default.Events);

        var evt = function evt(from, to) {
          _this2._keyframes.on(from, _utils.events.bubbleEvent(to, _this2));
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
    key: 'toObject',
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
    key: 'isCSSTransform',
    value: function isCSSTransform() {
      return ['x', 'y', 'z', 'rotation', 'rotationZ', 'rotationX', 'rotationY', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY'].includes(this.name);
    }

    /**
     * Destroy.
     * Clear events
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      if (this._keyframes) {
        this._keyframes.destroy();
      }
      _utils.events.clearEvents(this, Prop.Events);
    }
  }, {
    key: 'list',
    get: function get() {
      return this._list;
    }

    /**
     * Get keyframes
     *
     * @returns {Keyframes|object|Array}
     */

  }, {
    key: 'keyframes',
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
      if (!(kf instanceof _keyframes2.default)) {
        kf = new _keyframes2.default(kf);
      }

      var mappings = [];

      if (this._keyframes) {
        mappings = this._keyframes.mappings;
        _utils.events.clearEvents(this._keyframes, _keyframes2.default.Events);
        this._keyframes.clear();
      }

      this._keyframes = kf;
      this._keyframes.mappings = mappings;

      this.setupBubbleEvents();
    }
  }]);

  return Prop;
}(_events.EventEmitter), (_applyDecoratedDescriptor(_class2.prototype, 'keyframes', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'keyframes'), _class2.prototype)), _class2)) || _class);

/**
 * Create a valid Prop from object
 *
 * @param   {object} obj
 * @returns {Prop}
 */

Prop.fromObject = function (obj) {
  if (!_utils.is.isObject(obj)) {
    throw new Error('Object is invalid');
  }

  var keys = Object.keys(obj);

  if (keys.length === 0) {
    throw new Error('Object is invalid');
  }

  for (var i in obj) {
    if (!_utils.is.isObject(obj[i])) {
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

exports.default = Prop;
module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _prop = __webpack_require__(15);

var _prop2 = _interopRequireDefault(_prop);

var _utils = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Props = function (_List) {
  _inherits(Props, _List);

  /**
   * Create properties
   *
   * @constructor
   * @param {Array|object} props
   */
  function Props() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Props);

    if (_utils.is.isObject(props)) {
      props = _utils.convert.objectToArray(props);
    }

    var _this = _possibleConstructorReturn(this, (Props.__proto__ || Object.getPrototypeOf(Props)).call(this, props, _prop2.default, ['prop']));

    _this.duplicates = { prop: 'name' };

    _this.sortOn = function (a, b) {
      return b.name < a.name;
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
    key: 'get',
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
    key: 'add',


    /**
     * Add properties
     *
     * @param {*|Array} k
     * @returns {*}
     */
    value: function add(prop) {
      var _this2 = this;

      if (_utils.is.isObject(prop) && !(prop instanceof _prop2.default) && Object.keys(prop).length > 1) {
        prop = _utils.convert.objectToArray(prop);
      }

      var affected = _get(Props.prototype.__proto__ || Object.getPrototypeOf(Props.prototype), 'add', this).call(this, prop);
      var exec = function exec(prop) {
        prop.keyframes.mappings = [].concat(_toConsumableArray(_this2.mappings));
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
    key: 'remove',
    value: function remove(prop) {
      var affected = _get(Props.prototype.__proto__ || Object.getPrototypeOf(Props.prototype), 'remove', this).call(this, prop);
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
    key: 'haveProp',
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
    key: 'toObject',
    value: function toObject() {
      var ignoreEval = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      return this.list.reduce(function (obj, prop) {
        return _extends({}, obj, prop.toObject(ignoreEval));
      }, {});
    }

    /**
     * Destroy events
     */

  }, {
    key: 'destroy',
    value: function destroy() {
      this.each(function (prop) {
        return prop.destroy();
      });
      _utils.events.clearEvents(this, Props.Events);
    }
  }, {
    key: 'mappings',
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
        prop.keyframes.mappings = [].concat(_toConsumableArray(mappings));
      });
    }
  }]);

  return Props;
}(_list2.default);

Props.Events = ['change:list', 'add', 'remove', 'change', 'change:name', 'change:keyframes', 'change:keyframes:list', 'change:keyframe', 'change:keyframe:time', 'change:keyframe:value', 'change:keyframe:ease', 'add:keyframe', 'remove:keyframe'];

exports.default = Props;
module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _timeline = __webpack_require__(7);

var _timeline2 = _interopRequireDefault(_timeline);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Timelines = function (_List) {
  _inherits(Timelines, _List);

  /**
   * Create timelines instance.
   *
   * @param {Array} timelines
   */
  function Timelines() {
    var timelines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Timelines);

    return _possibleConstructorReturn(this, (Timelines.__proto__ || Object.getPrototypeOf(Timelines)).call(this, timelines, _timeline2.default, ['object', {}]));
  }

  /**
   * Get timeline by transformObject
   *
   * @param   {HTMLElement|object} transformObject
   * @returns {Timeline}
   */


  _createClass(Timelines, [{
    key: 'get',
    value: function get(transformObject) {
      return this._list.find(function (tl) {
        return tl.transformObject === transformObject;
      });
    }
  }]);

  return Timelines;
}(_list2.default);

exports.default = Timelines;
module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadScript;

var _context = __webpack_require__(4);

/**
 * Load script into web page context
 * .
 * @param   {string} src script source
 * @returns {Promise}
 */
function loadScript(src) {
  if (!(0, _context.isBrowser)()) {
    return Promise.reject(new Error('Script can only be loaded in browser: ' + src));
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
      reject(new Error('Could not load script ' + src));
    };

    document.body.appendChild(s);
  });
}
module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = setup;

var _utils = __webpack_require__(0);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _debug = __webpack_require__(8);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '2.0.1';

/**
 * Setup Spirit GSAP
 *
 * @param {object} conf
 */
function setup(conf) {
  return new Promise(function (resolve, reject) {
    var timeline = void 0,
        tween = void 0;

    if (_utils.is.isObject(conf)) {
      if (typeof conf.timeline === 'function' && typeof conf.tween === 'function') {
        timeline = conf.timeline;
        tween = conf.tween;
      }

      if (typeof conf.debug === 'boolean') {
        _config2.default.debug = conf.debug;
      }
    }

    if ((0, _debug2.default)()) {
      console.warn('You are running the development build of Spirit v' + version + '.');
    }

    if (!tween || !timeline) {
      _utils.gsap.ensure().then(resolve).catch(reject);
    } else {
      _config2.default.gsap.tween = tween;
      _config2.default.gsap.timeline = timeline;
      resolve();
    }
  });
}
module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.load = load;

var _utils = __webpack_require__(0);

var _group = __webpack_require__(12);

/**
 * Get transform object from container
 *
 * @param   {HTMLElement} container
 * @param   {object}      tl
 * @returns {HTMLElement|object}
 */
function getTransformObject(container, tl) {
  var to = void 0;

  if (tl.type !== 'object') {
    if (tl.id) {
      to = container.querySelector('[data-spirit-id="' + tl.id + '"]');

      if (!to && !tl.path) {
        if ((0, _utils.debug)()) {
          console.group('Unable to resolve element by [data-spirit-id] attribute');
          console.warn('Timeline: ', tl);
          console.groupEnd();
        }
        throw new Error('Cannot find element with [data-spirit-id="' + tl.id + '"]');
      }
    }

    if (!to && tl.path) {
      if (container === document.body) {
        container = undefined;
      }
      to = _utils.xpath.getElement(tl.path, container);

      if (!to) {
        if ((0, _utils.debug)()) {
          console.group('Unable to resolve element by path expression');
          console.warn('Timeline: ', tl);
          console.groupEnd();
        }
        throw new Error('Cannot find element with path expression ' + tl.path);
      }
    }

    if (!to) {
      if ((0, _utils.debug)()) {
        console.group('Unable to resolve element');
        console.warn('Timeline: ', tl);
        console.groupEnd();
      }
      throw new Error('Cannot find element.');
    }
  }

  return to;
}

/**
 * Get label for timeline to parse
 *
 * @param   {object} tl
 * @returns {string}
 */
function getLabel(tl) {
  if (typeof tl.label === 'string' && tl.label.trim().length > 0) {
    return tl.label;
  }
  if (tl.id) {
    return tl.id;
  }
  if (tl.path) {
    return tl.path;
  }
  return 'undefined';
}

/**
 * Parse groups
 *
 * @param   {object|Array}  data    animation data
 * @param   {HTMLElement}   element root element for animation groups
 * @returns Groups
 */
function create(data) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (!_utils.context.isBrowser()) {
    throw new Error('Invalid context. spirit.create() can only be executed in browser.');
  }

  // ensure root element
  if (!(element instanceof window.Element)) {
    element = document.body || document.documentElement;
  }

  if (!Array.isArray(data) && data['groups'] && Array.isArray(data['groups'])) {
    data = data['groups'];
  }

  if (!Array.isArray(data)) {
    data = [data];
  }

  var groups = new _group.Groups(element, []);

  data.forEach(function (g) {
    var d = {
      name: g.name,
      timeScale: g.timeScale || 1,
      timelines: []
    };

    g.timelines.forEach(function (tl) {
      var transformObject = getTransformObject(element, tl);

      d.timelines.push({
        transformObject: transformObject,
        props: tl.props,
        label: getLabel(tl),
        path: _utils.xpath.getExpression(transformObject, element),
        id: tl.id
      });
    });

    var group = new _group.Group(d);
    groups.add(group);
  });

  return groups;
}

/**
 * Load data and apply it to element
 *
 * @param   {string}      url
 * @param   {HTMLElement} element
 * @returns {Promise}
 */
function load(url) {
  var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

  if (!_utils.context.isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in browser.'));
  }

  return (0, _utils.jsonloader)(url).then(function (data) {
    return create(data, element);
  });
}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _list = __webpack_require__(1);

var _list2 = _interopRequireDefault(_list);

var _group = __webpack_require__(11);

var _group2 = _interopRequireDefault(_group);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _utils = __webpack_require__(0);

var _registry = __webpack_require__(9);

var _registry2 = _interopRequireDefault(_registry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Groups = function (_List) {
  _inherits(Groups, _List);

  /**
   * Create a groups instance.
   *
   * @param {HTMLElement} rootEl define the animation root
   * @param {Array} data
   */
  function Groups() {
    var rootEl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : document.body;
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Groups);

    var _this = _possibleConstructorReturn(this, (Groups.__proto__ || Object.getPrototypeOf(Groups)).call(this, data, _group2.default, [{ name: 'untitled' }]));

    _this.rootEl = null;


    if (!(rootEl instanceof window.Element)) {
      throw new Error('No root element provided.');
    }
    _this.rootEl = rootEl;

    // add groups to registry
    _this.each(function (g) {
      return _registry2.default.add(g);
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
    key: 'add',
    value: function add(group) {
      var affected = _get(Groups.prototype.__proto__ || Object.getPrototypeOf(Groups.prototype), 'add', this).call(this, group);

      Array.isArray(affected) ? affected.forEach(function (g) {
        return _registry2.default.add(g);
      }) : _registry2.default.add(affected);

      return affected;
    }

    /**
     * Remove group from list and global registry
     *
     * @param   {Array|*} group
     * @returns {Array|*}
     */

  }, {
    key: 'remove',
    value: function remove(group) {
      var affected = _get(Groups.prototype.__proto__ || Object.getPrototypeOf(Groups.prototype), 'remove', this).call(this, group);

      Array.isArray(affected) ? affected.forEach(function (g) {
        return _registry2.default.remove(g);
      }) : _registry2.default.remove(affected);

      return affected;
    }

    /**
     * Construct all groups
     *
     * @returns {Array.<TimelineLite|TimelineMax>}
     */

  }, {
    key: 'construct',
    value: function construct() {
      if (!_config2.default.gsap.timeline || !_config2.default.gsap.tween) {
        if ((0, _utils.debug)()) {
          console.warn('\n            Trying to construct groups, but GSAP cannot be found.\n            \n            Did you forgot to call spirit.setup() ?\n            \n            spirit.setup() usage:\n            \n                // auto inject gsap from cdn:\n                spirit.setup()\n                \n                // or provide gsap instances manually:\n                spirit.setup({\n                  tween:    TweenMax,\n                  timeline: TimelineMax\n                })\n          ');
        }
        throw new Error('GSAP cannot be found');
      }
      return this.list.map(function (group) {
        return group.construct();
      });
    }

    /**
     * Get group by name
     *
     * @param   {string} name
     * @returns {Group|undefined}
     */

  }, {
    key: 'get',
    value: function get(name) {
      return this.list.find(function (group) {
        return group.name === name;
      });
    }
  }]);

  return Groups;
}(_list2.default);

exports.default = Groups;
module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = function () {
  return arguments.length === 1 ? boundClass.apply(undefined, arguments) : boundMethod.apply(undefined, arguments);
};

var ignoreMethods = ['constructor'];

function boundClass(target) {
  var keys = Object.getOwnPropertyNames(target.prototype);
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
  }

  keys.forEach(function (key) {
    if (ignoreMethods.includes(key)) {
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
    throw new Error('@autobind decorator can only be applied to methods not: ' + (typeof fn === 'undefined' ? 'undefined' : _typeof(fn)));
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
module.exports = exports['default'];

/***/ },
/* 23 */
/***/ function(module, exports) {

"use strict";
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.objectToArray = objectToArray;
exports.arrayToObject = arrayToObject;

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
    a = _extends({}, a, b);
    return a;
  }, {});
}

/***/ },
/* 24 */
/***/ function(module, exports) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineError = exports.TimelineError = function (_Error) {
  _inherits(TimelineError, _Error);

  function TimelineError(message, transformObject) {
    var stack = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    _classCallCheck(this, TimelineError);

    var _this = _possibleConstructorReturn(this, (TimelineError.__proto__ || Object.getPrototypeOf(TimelineError)).call(this, message));

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

  return TimelineError;
}(Error);

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.bubbleEvent = bubbleEvent;
exports.createEventObjectForModel = createEventObjectForModel;
exports.clearEvents = clearEvents;

var _events = __webpack_require__(3);

var _list2 = __webpack_require__(1);

var _list3 = _interopRequireDefault(_list2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Bubble events.
 *
 * @param   {string}  evt
 * @param   {*}       scope event emitter
 * @returns {function}
 */
function bubbleEvent(evt, scope) {
  if (!(scope instanceof _events.EventEmitter)) {
    throw new Error('Scope needs to be an event emitter.');
  }

  return function () {
    this.emit.apply(this, [evt].concat(Array.prototype.slice.call(arguments)));

    if (this._list instanceof _list3.default) {
      var _list;

      (_list = this._list).emit.apply(_list, [evt].concat(Array.prototype.slice.call(arguments)));
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
    model: model.fromObject(_extends({}, obj, _defineProperty({}, prop, nextVal))),
    changed: {
      type: prop,
      from: prevVal,
      to: nextVal
    }
  };

  return evt;
}

/**
 * Clean up events.
 *
 * @param {*}     emitter
 * @param {Array} events fallback for older node implementations
 */
function clearEvents(emitter) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (emitter.eventNames && typeof emitter.eventNames === 'function') {
    emitter.eventNames().forEach(function (e) {
      return emitter.removeAllListeners(e);
    });
  } else {
    events.forEach(function (e) {
      return emitter.removeAllListeners(e);
    });
  }
}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.has = has;
exports.ensure = ensure;
exports.generateTimeline = generateTimeline;
exports.killTimeline = killTimeline;

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _loadscript = __webpack_require__(18);

var _loadscript2 = _interopRequireDefault(_loadscript);

var _timeline = __webpack_require__(7);

var _timeline2 = _interopRequireDefault(_timeline);

var _debug = __webpack_require__(8);

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Check on gsap presence
 *
 * @returns {boolean}
 */
function has() {
  return !!(_config2.default.gsap.tween && _config2.default.gsap.timeline);
}

/**
 * Ensure gsap is loaded
 * Auto inject gsap if configured
 *
 * @returns {Promise}
 */
function ensure() {
  if (has()) {
    return Promise.resolve();
  }

  if (!_config2.default.gsap.autoInject) {
    if ((0, _debug2.default)()) {
      console.warn('\n      \n        It seems that you have disabled autoInject. GSAP can not be found by Spirit.\n        Please make sure you provide the tween and timeline to Spirit.\n      \n        For example:\n        \n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n        \n        Or enable the autoInject "spirit.config.gsap.autoInject = true".\n        \n      ');
    }

    return Promise.reject(new Error('GSAP not found.'));
  }

  if ((0, _debug2.default)()) {
    console.warn('\n      \n      GSAP is being fetched from CDN: ' + _config2.default.gsap.autoInjectUrl + '.\n      If you already have GSAP installed, please provide it to Spirit:\n      \n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n      \n      You want to use another cdn? Change it here:\n       \n        spirit.config.gsap.autoInjectUrl = \'https://cdn.xxx\'\n      \n    ');
  }

  return (0, _loadscript2.default)(_config2.default.gsap.autoInjectUrl).then(function () {
    _config2.default.gsap.tween = window.TweenMax;
    _config2.default.gsap.timeline = window.TimelineMax;

    return Promise.resolve();
  });
}

/**
 * Generate timeline from data
 *
 * @param {Timeline} timeline
 * @returns {TimelineMax|TimelineLite}
 */
function generateTimeline(timeline) {
  if (!timeline || !(timeline instanceof _timeline2.default)) {
    throw new Error('Need valid timeline data to generate GSAP timeline from');
  }

  if (!_config2.default.gsap.timeline) {
    throw new Error('GSAP not set. Please make sure GSAP is available.');
  }

  if (timeline.type !== 'dom') {
    throw new Error('Timeline invalid. Needs a timeline with type of dom.');
  }

  var tl = new _config2.default.gsap.timeline({ paused: true }); // eslint-disable-line new-cap

  var transformOrigin = timeline.props.get('transformOrigin');

  timeline.props.each(function (prop) {
    if (prop.keyframes.length === 0 || prop.name === 'transformOrigin' || prop.name === 'svgOrigin') {
      return;
    }

    var keyframe = prop.keyframes.at(0);

    var _loop = function _loop() {
      var _keyframe = keyframe,
          value = _keyframe.value,
          ease = _keyframe.ease,
          time = _keyframe.time;

      var prev = keyframe.prev();

      var start = prev ? prev.time : 0;
      var duration = prev ? time - prev.time : time;

      var props = { ease: ease || 'Linear.easeNone' };
      var property = _defineProperty({}, prop.name, value);

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

      props = _extends({}, props, property);

      if (time === 0) {
        props.immediateRender = true;
      }

      if (prop.isCSSTransform()) {
        // set transform origin to last known frame
        var _transformOrigin = '50% 50%';
        if (transformOrigin && transformOrigin.keyframes.list.length > 0) {
          var l = transformOrigin.keyframes.list.filter(function (k) {
            return time === 0 ? k.time <= time : k.time < time;
          }).sort(function (a, b) {
            return a.time < b.time;
          });
          _transformOrigin = l.length > 0 && l[0].value || _transformOrigin;
        }
        props.transformOrigin = _transformOrigin;
      }

      tl.to(timeline.transformObject, duration, props, start);

      keyframe = keyframe.next();
    };

    while (keyframe) {
      _loop();
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
  if (gsapTimeline && gsapTimeline instanceof _config2.default.gsap.timeline) {
    var targets = gsapTimeline.getChildren();
    gsapTimeline.kill();

    for (var i = 0; i < targets.length; i++) {
      if (targets[i] && targets[i] instanceof _config2.default.gsap.timeline) {
        killTimeline(targets[i]);
        continue;
      }

      if (targets[i].target !== null) {
        _config2.default.gsap.tween.set(targets[i].target, { clearProps: 'all' });
      }
    }
    gsapTimeline.clear();
  }
}

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cache = exports.req = undefined;

exports.default = function (url) {
  // only run in browser
  if (!(0, _context.isBrowser)()) {
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
          reject(new Error('jsonLoader: Invalid json for request ' + url));
        }
      }
    };

    try {
      xmlhttp.open('GET', encodeURI(url), true);
      xmlhttp.send();
    } catch (err) {
      reject(new Error('Could not open request. Unable to load ' + url));
    }
  });

  // store request
  if (!req[url]) {
    req[url] = promise;
  }

  // send back the promise
  return promise;
};

var _context = __webpack_require__(4);

var req = exports.req = {};
var cache = exports.cache = {};

/**
 * JSON Loader.
 * Optimize requests by caching results based on url.
 *
 * @param   {string} url
 * @returns {Promise}
 */

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExpression = getExpression;
exports.getElement = getElement;

var _is = __webpack_require__(6);

/**
 * Get DOM representation for an element.
 *
 * @param   {HTMLElement}                 element
 * @param   {null|undefined|HTMLElement}  nodeContext
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
    var pathIndex = '[' + (index + 1) + ']';

    if ((0, _is.isSVG)(element)) {
      tagName = '*[local-name()=\'' + tagName + '\']';
    }

    paths.unshift(tagName + pathIndex);
    element = element.parentNode;
  }

  if (paths.length === 0) {
    return null;
  }
  return nodeContext ? paths.join('/') : '/' + paths.join('/');
}

/**
 * Get an element from expression
 *
 * @param {string}      expression
 * @param {HTMLElement} nodeContext
 * @returns {HTMLElement|null}
 */
function getElement(expression) {
  var nodeContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (!nodeContext) {
    nodeContext = document.body;
  }

  var evaluated = document.evaluate(expression, nodeContext, null, window.XPathResult.ANY_TYPE, null);
  return evaluated.iterateNext();
}

/***/ },
/* 29 */
/***/ function(module, exports) {

var g;

// This works in non-strict mode
g = (function() { return this; })();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = exports.create = exports.groups = exports.setup = exports.version = exports.config = undefined;

var _utils = __webpack_require__(0);

var _config = __webpack_require__(2);

var _config2 = _interopRequireDefault(_config);

var _setup = __webpack_require__(19);

var _setup2 = _interopRequireDefault(_setup);

var _registry = __webpack_require__(9);

var _registry2 = _interopRequireDefault(_registry);

var _parser = __webpack_require__(20);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '2.0.1';

var Spirit = function Spirit() {
  this.config = _config2.default;
  this.version = version;
  this.setup = _setup2.default;
  this.groups = _registry2.default;
  this.create = _parser.create;
  this.load = _parser.load;
};

exports.config = _config2.default;
exports.version = version;
exports.setup = _setup2.default;
exports.groups = _registry2.default;
exports.create = _parser.create;
exports.load = _parser.load;


var spirit = new Spirit();

module.exports = spirit;

if (_utils.context.isBrowser() && !window.spirit) {
  window.spirit = spirit;
}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=spirit.js.map