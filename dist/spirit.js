/*!
 * Spirit.js v2.2.5
 * 
 * (c) 2018 Patrick Brouwer
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
/******/ 	return __webpack_require__(__webpack_require__.s = 34);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__gsap__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__convert__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__xpath__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__is__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__emitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__resolver__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__loadscript__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__jsonloader__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__autobind__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__debug__ = __webpack_require__(6);













/* harmony reexport (module object) */ __webpack_require__.d(exports, "f", function() { return __WEBPACK_IMPORTED_MODULE_7__resolver__; });
/* harmony reexport (module object) */ __webpack_require__.d(exports, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__context__; });
/* harmony reexport (module object) */ __webpack_require__.d(exports, "e", function() { return __WEBPACK_IMPORTED_MODULE_1__gsap__; });
/* harmony reexport (module object) */ __webpack_require__.d(exports, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__events__; });
/* harmony reexport (module object) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_3__convert__; });
/* harmony reexport (module object) */ __webpack_require__.d(exports, "g", function() { return __WEBPACK_IMPORTED_MODULE_4__xpath__; });
/* harmony reexport (module object) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_5__is__; });
/* unused harmony reexport emitter */
/* unused harmony reexport loadscript */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__jsonloader__["a"]; });
/* unused harmony reexport autobind */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "h", function() { return __WEBPACK_IMPORTED_MODULE_11__debug__["a"]; });


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_context__ = __webpack_require__(3);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Config = function Config() {
  _classCallCheck(this, Config);

  this.debug = "development" === 'development' && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils_context__["isBrowser"])();
  this.overwriteAnimations = true;
  this.gsap = {
    tween: null,
    timeline: null,
    autoInject: true,
    autoInjectUrl: 'https://unpkg.com/gsap/src/minified/TweenMax.min.js'
  };
};

/* harmony default export */ exports["a"] = new Config();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_is__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_proxify__ = __webpack_require__(30);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var List = function (_ArrayLike) {
  _inherits(List, _ArrayLike);

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
          if (__WEBPACK_IMPORTED_MODULE_0__utils_is__["isObject"](item) && typeof model.fromObject === 'function') {
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
      if (__WEBPACK_IMPORTED_MODULE_0__utils_is__["isObject"](dup) && dup.hasOwnProperty('prop')) {
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
          if (__WEBPACK_IMPORTED_MODULE_0__utils_is__["isObject"](this._list[i])) {
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
          } else if (__WEBPACK_IMPORTED_MODULE_0__utils_is__["isObject"](i) && typeof _this2._model.fromObject === 'function') {
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

            if (__WEBPACK_IMPORTED_MODULE_0__utils_is__["isObject"](ins)) {
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
        if (__WEBPACK_IMPORTED_MODULE_0__utils_is__["isObject"](b)) {
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
}(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_proxify__["a" /* ArrayLike */])(__WEBPACK_IMPORTED_MODULE_1__utils_events__["Emitter"], '_list'));

List.Events = ['change:list', 'add', 'remove'];

/* harmony default export */ exports["a"] = List;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (immutable) */ exports["isBrowser"] = isBrowser;
function isBrowser() {
  return 'window' in global && 'document' in global;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(33)))

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_mitt__ = __webpack_require__(32);
/* harmony export (immutable) */ exports["bubbleEvent"] = bubbleEvent;
/* harmony export (immutable) */ exports["createEventObjectForModel"] = createEventObjectForModel;
/* harmony export (binding) */ __webpack_require__.d(exports, "Emitter", function() { return Emitter; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

    if (this._list instanceof __WEBPACK_IMPORTED_MODULE_0__list_list__["a" /* default */]) {
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
 * Minimal event emitter
 */
var Emitter = function () {
  function Emitter() {
    _classCallCheck(this, Emitter);

    this._events = {};
    this._emitter = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_mitt__["a" /* default */])(this._events);
  }

  _createClass(Emitter, [{
    key: 'eventNames',
    value: function eventNames() {
      return Object.keys(this._events);
    }
  }, {
    key: 'emit',
    value: function emit(eventName) {
      var _emitter;

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      (_emitter = this._emitter).emit.apply(_emitter, [eventName].concat(args));
    }
  }, {
    key: 'on',
    value: function on(event, listener) {
      this._emitter.on(event, listener);
    }
  }, {
    key: 'removeListener',
    value: function removeListener(event, listener) {
      this._emitter.off(event, listener);
    }
  }, {
    key: 'removeAllListeners',
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["isObject"] = isObject;
/* harmony export (immutable) */ exports["isSVG"] = isSVG;
/* harmony export (immutable) */ exports["isFunction"] = isFunction;
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_config__ = __webpack_require__(1);



var debug = function debug() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__context__["isBrowser"])() && Boolean(__WEBPACK_IMPORTED_MODULE_1__config_config__["a" /* default */].debug);
};
/* harmony default export */ exports["a"] = debug;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__is__ = __webpack_require__(5);
/* harmony export (immutable) */ exports["a"] = emitChange;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

  if (!__WEBPACK_IMPORTED_MODULE_0__events__["Emitter"].prototype.isPrototypeOf(target) && !__WEBPACK_IMPORTED_MODULE_0__events__["Emitter"].prototype.isPrototypeOf(target.prototype)) {
    throw new Error('@emitter.emitChange can only be applied to event emitters');
  }

  return _extends({}, descriptor, {
    configurable: true,
    set: function set(val) {
      var _this = this;

      var toObj = function toObj(v) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__is__["isFunction"])(_this.toObject) ? _this.toObject() : _defineProperty({}, key, v !== undefined ? v : val);
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
      if (this._list instanceof __WEBPACK_IMPORTED_MODULE_1__list_list__["a" /* default */] && this._list._duplicates !== true) {
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

      var from = prev && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__is__["isFunction"])(prev.toObject) ? prev.toObject() : prev;

      var to = val && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__is__["isFunction"])(val.toObject) ? val.toObject() : val;

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

      if (this._list && this._list instanceof __WEBPACK_IMPORTED_MODULE_0__events__["Emitter"]) {
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
function emitChange() {
  var prop = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(1);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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
      var _this2 = this;

      if (!(group instanceof __WEBPACK_IMPORTED_MODULE_1__group__["a" /* Group */])) {
        throw new Error('Invalid group. Only Group instances allowed.');
      }

      var existingGroup = this.get(group.name);
      var warn = function warn(msg) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["h" /* debug */])() && console.warn('registry.add() Group "' + group.name + '" ' + msg);
      };

      var addToRegistry = function addToRegistry() {
        if (existingGroup) {
          warn('overwrite group in registry');
          _this2.remove(existingGroup);
        }
        _get(Registry.prototype.__proto__ || Object.getPrototypeOf(Registry.prototype), 'add', _this2).call(_this2, group);
      };

      if (__WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* default */].overwriteAnimations) {
        return addToRegistry();
      }

      if (!existingGroup) {
        warn('added to registry and can be resolved by Spirit desktop app');
        return addToRegistry();
      }

      warn('skipped, already exists in registry');
    }

    /**
     * Remove group from registry
     *
     * @param   {Group} group
     * @returns {Group}
     */

  }, {
    key: 'remove',
    value: function remove(group) {
      group.reset();
      return _get(Registry.prototype.__proto__ || Object.getPrototypeOf(Registry.prototype), 'remove', this).call(this, group);
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
}(__WEBPACK_IMPORTED_MODULE_0__list_list__["a" /* default */]);

/* harmony default export */ exports["a"] = new Registry();

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__props__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_emitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__evalmap__ = __webpack_require__(12);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _desc, _value, _class;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
 * Timeline.
 */
var Timeline = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_emitter__["a" /* emitChange */])(), (_class = function (_Emitter) {
  _inherits(Timeline, _Emitter);

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
    var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new __WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */]();
    var path = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var id = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var label = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, Timeline);

    var _this = _possibleConstructorReturn(this, (Timeline.__proto__ || Object.getPrototypeOf(Timeline)).call(this));

    _this.type = 'dom';
    _this._transformObject = null;
    _this.label = null;
    _this.path = null;
    _this.id = null;
    _this.props = null;


    Object.assign(_this, {
      type: type,
      props: props instanceof __WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */] ? props : new __WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */](props),
      label: label,
      path: path,
      id: id
    });

    _this.transformObject = transformObject;
    return _this;
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
    key: 'validate',
    value: function validate() {
      if (this.type === 'dom' && __WEBPACK_IMPORTED_MODULE_1__utils__["d" /* context */].isBrowser() && this.transformObject && !(this.transformObject instanceof window.Element)) {
        throw new Error('transformObject needs to be an element');
      }

      if (this.type === 'object' && this.transformObject && !__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* is */].isObject(this.transformObject)) {
        throw new Error('transformObject needs to be an object');
      }
    }
  }, {
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
      if (this.props instanceof __WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */]) {
        this.props.each(function (tr) {
          return tr.destroy();
        });
      }
    }
  }, {
    key: 'transformObject',
    set: function set(transformObject) {
      this._transformObject = transformObject;
      this.validate();

      if (transformObject && this.props instanceof __WEBPACK_IMPORTED_MODULE_0__props__["a" /* default */]) {
        var thisMapper = this.props.mappings.find(function (mapping) {
          return String(mapping.regex) === '/this/g';
        });

        thisMapper ? thisMapper.map = transformObject : this.props.mappings.push(new __WEBPACK_IMPORTED_MODULE_4__evalmap__["a" /* default */](/this/g, transformObject));

        this.props.mappings = [].concat(_toConsumableArray(this.props.mappings));
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
}(__WEBPACK_IMPORTED_MODULE_3__utils_events__["Emitter"]), (_applyDecoratedDescriptor(_class.prototype, 'transformObject', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'transformObject'), _class.prototype)), _class));


Timeline.fromObject = function (obj) {
  if (!__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* is */].isObject(obj)) {
    throw new Error('Object is invalid.');
  }

  var args = __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* convert */].objectToArray(obj).filter(function (arg) {
    return arg !== undefined;
  });
  args = _extends({
    type: args.type || 'dom',
    props: {}
  }, __WEBPACK_IMPORTED_MODULE_1__utils__["b" /* convert */].arrayToObject(args));

  return new Timeline(args.type, args.transformObject, args.props, args.path || undefined, args.id || undefined, args.label || undefined);
};

/* harmony default export */ exports["a"] = Timeline;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(1);
/* harmony export (immutable) */ exports["a"] = setup;



/**
 * Setup Spirit GSAP
 *
 * @param {object} conf
 */
function setup() {
  var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return new Promise(function (resolve, reject) {
    __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* is */].isObject(conf) && Object.keys(conf).forEach(function (k) {
      var obj = __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].gsap.hasOwnProperty(k) && __WEBPACK_IMPORTED_MODULE_0__utils__["a" /* is */].isFunction(conf[k]) ? __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */].gsap : __WEBPACK_IMPORTED_MODULE_1__config__["a" /* default */];

      obj[k] = conf[k];
    });

    __WEBPACK_IMPORTED_MODULE_0__utils__["e" /* gsap */].ensure().then(resolve).catch(reject);
  });
}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group__ = __webpack_require__(14);
/* harmony export (immutable) */ exports["a"] = create;
/* harmony export (immutable) */ exports["b"] = load;



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
        groups = new __WEBPACK_IMPORTED_MODULE_1__group__["b" /* Groups */](root, []);
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

  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* context */].isBrowser()) {
    throw new Error('Invalid context. spirit.create() can only be executed in the browser.');
  }

  var resolveRoot = false;

  // ensure root element
  if (!(root instanceof window.Element)) {
    resolveRoot = true;
    root = document.body || document.documentElement;
  }

  if (__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* is */].isObject(data) && data['groups'] && Array.isArray(data['groups'])) {
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
      groupRoot = __WEBPACK_IMPORTED_MODULE_0__utils__["f" /* resolver */].resolveElement(root, g.root);
      if (!groupRoot) {
        groupRoot = root;
      }
    }

    var d = { name: g.name, timeScale: g.timeScale || 1, timelines: [] };
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

    factory.add(groupRoot, new __WEBPACK_IMPORTED_MODULE_1__group__["a" /* Group */](d));
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

  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* context */].isBrowser()) {
    return Promise.reject(new Error('Invalid context: spirit.load() can only be executed in the browser.'));
  }

  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* jsonloader */])(url).then(function (data) {
    return create(data, root);
  });
}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
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

/* harmony default export */ exports["a"] = EvalMap;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__timelines__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_emitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_errors__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_events__ = __webpack_require__(4);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _dec4, _desc, _value, _class;

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
var Group = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_emitter__["a" /* emitChange */])(), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_emitter__["a" /* emitChange */])(), _dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_emitter__["a" /* emitChange */])(), _dec4 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils_emitter__["a" /* emitChange */])(), (_class = function (_Emitter) {
  _inherits(Group, _Emitter);

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
    _this._timelines = new __WEBPACK_IMPORTED_MODULE_2__timelines__["a" /* default */]();
    _this.timeline = null;


    if (!props.name || typeof props.name !== 'string' || props.name.trim() === '') {
      throw new Error('Cannot create group without a name.');
    }

    var defaults = {
      name: 'untitled',
      timeScale: 1,
      timelines: new __WEBPACK_IMPORTED_MODULE_2__timelines__["a" /* default */]()
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
      var killed = false;
      if (this.timeline) {
        killed = true;
        __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* gsap */].killTimeline(this.timeline);

        // reset styles
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
    key: 'resolve',
    value: function resolve() {
      this.reset();

      var root = this._list && this._list.rootEl ? this._list.rootEl : null;

      if (!root) {
        return this;
      }

      var hasUnresolved = false;

      this.timelines.each(function (timeline) {
        if (timeline.type === 'dom') {
          timeline.transformObject = !root ? null : __WEBPACK_IMPORTED_MODULE_1__utils__["f" /* resolver */].resolveElement(root, timeline);

          if (timeline.transformObject) {
            timeline.path = __WEBPACK_IMPORTED_MODULE_1__utils__["g" /* xpath */].getExpression(timeline.transformObject, root);
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
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* debug */])()) {
          console.warn('Could not resolve all elements for group ' + this.name, this.unresolved);
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
    key: 'construct',
    value: function construct() {
      var _this2 = this;

      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      try {
        if (!__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* gsap */].has()) {
          if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* debug */])()) {
            console.warn('Cannot construct group ' + this.name + '. GSAP not found.');
          }
          throw new Error('GSAP cannot be found');
        }

        resolve && this.resolve();

        if (!this.reset()) {
          this.timeline = new __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline({ paused: true }); // eslint-disable-line new-cap
        }

        this.resolved.each(function (timeline) {
          if (timeline.type === 'dom' && timeline.transformObject instanceof window.Element) {
            try {
              _this2.timeline.add(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* gsap */].generateTimeline(timeline).play(), 0, 'start');
            } catch (err) {
              throw new __WEBPACK_IMPORTED_MODULE_4__utils_errors__["a" /* TimelineError */](err.message, timeline.transformObject, err.stack);
            }
          }
        });

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
     * Get unresolved timelines
     *
     * @returns {Timelines}
     */
    ,
    set: function set(timelines) {
      if (!(timelines instanceof __WEBPACK_IMPORTED_MODULE_2__timelines__["a" /* default */])) {
        timelines = new __WEBPACK_IMPORTED_MODULE_2__timelines__["a" /* default */](Array.from(timelines));
      }
      this._timelines = timelines;
    }

    /**
     * Get current timeScale
     *
     * @returns {number}
     */

  }, {
    key: 'unresolved',
    get: function get() {
      var timelines = new __WEBPACK_IMPORTED_MODULE_2__timelines__["a" /* default */]();
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
    key: 'resolved',
    get: function get() {
      var timelines = new __WEBPACK_IMPORTED_MODULE_2__timelines__["a" /* default */]();
      this.timelines.each(function (tl) {
        return !!tl.transformObject && timelines.add(tl);
      });
      return timelines;
    }

    /**
     * Set timelines
     *
     * @param {Timelines} timelines
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

      if (this.timeline && this.timeline instanceof __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline) {
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
      if (this.timeline && this.timeline instanceof __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline) {
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
}(__WEBPACK_IMPORTED_MODULE_5__utils_events__["Emitter"]), (_applyDecoratedDescriptor(_class.prototype, 'timelines', [_dec], Object.getOwnPropertyDescriptor(_class.prototype, 'timelines'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'timeScale', [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, 'timeScale'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'duration', [_dec3], Object.getOwnPropertyDescriptor(_class.prototype, 'duration'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, 'name', [_dec4], Object.getOwnPropertyDescriptor(_class.prototype, 'name'), _class.prototype)), _class));


Group.fromObject = function (obj) {
  return new Group(obj);
};

/* harmony default export */ exports["a"] = Group;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__evalmap__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__groups__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__keyframe__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__keyframes__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__prop__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__props__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__timeline__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__timelines__ = __webpack_require__(19);










/* unused harmony reexport Timelines */
/* unused harmony reexport EvalMap */
/* harmony reexport (binding) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__group__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__groups__["a"]; });
/* unused harmony reexport Keyframe */
/* unused harmony reexport Keyframes */
/* unused harmony reexport Prop */
/* unused harmony reexport Props */
/* unused harmony reexport Timeline */


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_emitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_events__ = __webpack_require__(4);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

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

var Keyframe = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_emitter__["a" /* emitChange */])('time', null, [{ validator: function validator(val) {
    return typeof val === 'number';
  }, message: 'Time must be a number' }]), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_emitter__["a" /* emitChange */])('ease', null), _dec3 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils_emitter__["a" /* emitChange */])(), _dec(_class = _dec2(_class = (_class2 = function (_Emitter) {
  _inherits(Keyframe, _Emitter);

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

    /**
     * Get the  value
     *
     * @returns {*}
     */

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
      this.removeAllListeners();
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
    key: 'list',
    get: function get() {
      return this._list;
    }
  }]);

  return Keyframe;
}(__WEBPACK_IMPORTED_MODULE_2__utils_events__["Emitter"]), (_applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'value'), _class2.prototype)), _class2)) || _class) || _class);

/**
 * Create keyframe instance from object
 *
 * @example { "0.2s": { value: 10, ease: "Linear.easeNone" }}
 * @param   {object} obj
 * @returns {Keyframe}
 */

Keyframe.fromObject = function (obj) {
  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* is */].isObject(obj)) {
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


  if (!__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* is */].isObject(obj[time]) && (typeof obj[time] === 'string' || typeof obj[time] === 'number')) {
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

/* harmony default export */ exports["a"] = Keyframe;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__keyframe__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

    if (__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* is */].isObject(keyframes)) {
      keyframes = __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* convert */].objectToArray(keyframes);
    }

    var _this = _possibleConstructorReturn(this, (Keyframes.__proto__ || Object.getPrototypeOf(Keyframes)).call(this, keyframes, __WEBPACK_IMPORTED_MODULE_1__keyframe__["a" /* default */], [0, 0]));

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

      if (__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* is */].isObject(keyframe) && !(keyframe instanceof __WEBPACK_IMPORTED_MODULE_1__keyframe__["a" /* default */]) && Object.keys(keyframe).length > 1) {
        keyframe = __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* convert */].objectToArray(keyframe);
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
      this.removeAllListeners();
      this.each(function (keyframe) {
        return keyframe.destroy();
      });
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
}(__WEBPACK_IMPORTED_MODULE_0__list_list__["a" /* default */]);

Keyframes.Events = ['change:list', 'add', 'remove', 'change', 'change:time', 'change:value', 'change:ease'];

/* harmony default export */ exports["a"] = Keyframes;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__keyframes__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_emitter__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_events__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_polyfill__ = __webpack_require__(21);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _dec2, _class, _desc, _value, _class2;

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

var Prop = (_dec = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_emitter__["a" /* emitChange */])('name', null, [{ validator: function validator(val) {
    return typeof val === 'string';
  }, message: 'Name must be a string' }, { validator: function validator(val) {
    return !/^\d+\.?\d*?$/.test(val);
  }, message: 'Name must be a string' }]), _dec2 = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_emitter__["a" /* emitChange */])(), _dec(_class = (_class2 = function (_Emitter) {
  _inherits(Prop, _Emitter);

  /**
   * Property.
   *
   * @param {string} name
   * @param {object|Keyframes|Array} keyframes
   */
  function Prop(name) {
    var keyframes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new __WEBPACK_IMPORTED_MODULE_0__keyframes__["a" /* default */]();

    _classCallCheck(this, Prop);

    var _this = _possibleConstructorReturn(this, (Prop.__proto__ || Object.getPrototypeOf(Prop)).call(this));

    _this._keyframes = null;
    _this._list = null;


    if (!(keyframes instanceof __WEBPACK_IMPORTED_MODULE_0__keyframes__["a" /* default */])) {
      keyframes = new __WEBPACK_IMPORTED_MODULE_0__keyframes__["a" /* default */](keyframes);
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

      if (this._keyframes instanceof __WEBPACK_IMPORTED_MODULE_0__keyframes__["a" /* default */]) {
        this._keyframes.removeAllListeners();

        var evt = function evt(from, to) {
          _this2._keyframes.on(from, __WEBPACK_IMPORTED_MODULE_1__utils__["c" /* events */].bubbleEvent(to, _this2));
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
      return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils_polyfill__["a" /* includes */])(['x', 'y', 'z', 'rotation', 'rotationZ', 'rotationX', 'rotationY', 'skewX', 'skewY', 'scale', 'scaleX', 'scaleY'], this.name);
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
      this.removeAllListeners();
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
      if (!(kf instanceof __WEBPACK_IMPORTED_MODULE_0__keyframes__["a" /* default */])) {
        kf = new __WEBPACK_IMPORTED_MODULE_0__keyframes__["a" /* default */](kf);
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
}(__WEBPACK_IMPORTED_MODULE_3__utils_events__["Emitter"]), (_applyDecoratedDescriptor(_class2.prototype, 'keyframes', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'keyframes'), _class2.prototype)), _class2)) || _class);

/**
 * Create a valid Prop from object
 *
 * @param   {object} obj
 * @returns {Prop}
 */

Prop.fromObject = function (obj) {
  if (!__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* is */].isObject(obj)) {
    throw new Error('Object is invalid');
  }

  var keys = Object.keys(obj);

  if (keys.length === 0) {
    throw new Error('Object is invalid');
  }

  for (var i in obj) {
    if (!__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* is */].isObject(obj[i])) {
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

/* harmony default export */ exports["a"] = Prop;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__prop__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

    if (__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* is */].isObject(props)) {
      props = __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* convert */].objectToArray(props);
    }

    var _this = _possibleConstructorReturn(this, (Props.__proto__ || Object.getPrototypeOf(Props)).call(this, props, __WEBPACK_IMPORTED_MODULE_1__prop__["a" /* default */], ['prop']));

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

      if (__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* is */].isObject(prop) && !(prop instanceof __WEBPACK_IMPORTED_MODULE_1__prop__["a" /* default */]) && Object.keys(prop).length > 1) {
        prop = __WEBPACK_IMPORTED_MODULE_2__utils__["b" /* convert */].objectToArray(prop);
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
      this.removeAllListeners();
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
}(__WEBPACK_IMPORTED_MODULE_0__list_list__["a" /* default */]);

Props.Events = ['change:list', 'add', 'remove', 'change', 'change:name', 'change:keyframes', 'change:keyframes:list', 'change:keyframe', 'change:keyframe:time', 'change:keyframe:value', 'change:keyframe:ease', 'add:keyframe', 'remove:keyframe'];

/* harmony default export */ exports["a"] = Props;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__timeline__ = __webpack_require__(9);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

    return _possibleConstructorReturn(this, (Timelines.__proto__ || Object.getPrototypeOf(Timelines)).call(this, timelines, __WEBPACK_IMPORTED_MODULE_1__timeline__["a" /* default */], ['object', {}]));
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
}(__WEBPACK_IMPORTED_MODULE_0__list_list__["a" /* default */]);

/* harmony default export */ exports["a"] = Timelines;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(3);
/* harmony export (immutable) */ exports["a"] = loadScript;


/**
 * Load script into web page context
 * .
 * @param   {string} src script source
 * @returns {Promise}
 */
function loadScript(src) {
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__context__["isBrowser"])()) {
    return Promise.reject(new Error('Script can only be loaded in the browser: ' + src));
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

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["a"] = includes;
function includes(arr, item) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === item) {
      return true;
    }
  }
  return false;
}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__is__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__debug__ = __webpack_require__(6);
/* harmony export (immutable) */ exports["getExpression"] = getExpression;
/* harmony export (immutable) */ exports["getElement"] = getElement;



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
    var pathIndex = '[' + (index + 1) + ']';

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__is__["isSVG"])(element)) {
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
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__debug__["a" /* default */])()) {
      console.error('Cannot get element from expression: ', expression);
      console.error(err.stack);
    }
  }

  return null;
}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_setup__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_parser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_is__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__registry_registry__ = __webpack_require__(8);
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }







var defaults = {
  loop: false,
  autoPlay: true,
  yoyo: false,
  delay: 0,
  timeScale: false

  /**
   * Create from data
   *
   * @param {object|Array} data
   * @param {Element}      container
   * @return {Promise<Array|object>}
   */
};function createFromData(data, container) {
  if (data === undefined) {
    return Promise.resolve([]);
  }

  if (!(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils_is__["isObject"])(data) || Array.isArray(data))) {
    return Promise.reject(new Error('Invalid animation data'));
  }
  return Promise.resolve(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__data_parser__["a" /* create */])(data, container));
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
    return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__data_parser__["b" /* load */])(path, container);
  }
  return Promise.resolve([]);
}

/**
 * Load animation shorthand
 *
 * @param  {object} manifest
 * @return {Promise<Array|Function>}
 */
/* harmony default export */ exports["a"] = function (manifest) {
  var options = _extends({}, defaults, manifest);
  var animationData = options.animationData,
      container = options.container,
      path = options.path;


  if (options.loop === true) {
    options.loop = -1;
  }

  return new Promise(function (resolve, reject) {
    var result = [];
    var add = function add(coll) {
      result = [].concat(_toConsumableArray(result), _toConsumableArray(Array.isArray(coll) ? [].concat(_toConsumableArray(coll)) : [coll]));
    };

    // setup gsap
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__config_setup__["a" /* default */])().then(function () {
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
      }

      // multiple groups!
      var g = {};
      result.forEach(function (groups) {
        groups.each(function (group) {
          g[group.name] = group.construct();
          g[group.name].construct = function () {
            var tl = __WEBPACK_IMPORTED_MODULE_4__registry_registry__["a" /* default */].get(group.name).construct();
            tl.construct = this.construct;
            return tl;
          };
        });
      });
      return g;
    }).then(function (res) {
      var timelines = res instanceof __WEBPACK_IMPORTED_MODULE_3__config_config__["a" /* default */].gsap.timeline ? [res] : Object.keys(res).map(function (k) {
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
      }

      // finally resolve res
      resolve(res);
    }).catch(reject);
  });
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_list__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__group__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__registry_registry__ = __webpack_require__(8);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

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

    var _this = _possibleConstructorReturn(this, (Groups.__proto__ || Object.getPrototypeOf(Groups)).call(this, data, __WEBPACK_IMPORTED_MODULE_1__group__["a" /* default */], [{ name: 'untitled' }]));

    _this.rootEl = null;


    if (!(rootEl instanceof window.Element)) {
      throw new Error('No root element provided.');
    }
    _this.rootEl = rootEl;

    // add groups to registry
    _this.each(function (g) {
      return __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a" /* default */].add(g);
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
        return __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a" /* default */].add(g);
      }) : __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a" /* default */].add(affected);

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
        return __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a" /* default */].remove(g);
      }) : __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a" /* default */].remove(affected);

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
      var resolve = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (!__WEBPACK_IMPORTED_MODULE_2__utils__["e" /* gsap */].has()) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["h" /* debug */])() && console.warn('Trying to construct groups, but GSAP cannot be found.');
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
    key: 'get',
    value: function get(name) {
      return this.list.find(function (group) {
        return group.name === name;
      });
    }
  }]);

  return Groups;
}(__WEBPACK_IMPORTED_MODULE_0__list_list__["a" /* default */]);

/* harmony default export */ exports["a"] = Groups;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfill__ = __webpack_require__(21);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };



/* unused harmony default export */ var _unused_webpack_default_export = function () {
  return arguments.length === 1 ? boundClass.apply(undefined, arguments) : boundMethod.apply(undefined, arguments);
};

var ignoreMethods = ['constructor'];

function boundClass(target) {
  var keys = Object.getOwnPropertyNames(target.prototype);
  if (typeof Object.getOwnPropertySymbols === 'function') {
    keys = keys.concat(Object.getOwnPropertySymbols(target.prototype));
  }

  keys.forEach(function (key) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__polyfill__["a" /* includes */])(ignoreMethods, key)) {
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

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ exports["objectToArray"] = objectToArray;
/* harmony export (immutable) */ exports["arrayToObject"] = arrayToObject;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TimelineError; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TimelineError = function (_Error) {
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__config_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loadscript__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__group_timeline__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__debug__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__is__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__context__ = __webpack_require__(3);
/* harmony export (immutable) */ exports["has"] = has;
/* harmony export (immutable) */ exports["ensure"] = ensure;
/* harmony export (immutable) */ exports["loadFromCDN"] = loadFromCDN;
/* harmony export (immutable) */ exports["transformOrigins"] = transformOrigins;
/* harmony export (immutable) */ exports["generateTimeline"] = generateTimeline;
/* harmony export (immutable) */ exports["killTimeline"] = killTimeline;
/* harmony export (immutable) */ exports["isTimeline"] = isTimeline;
/* harmony export (immutable) */ exports["isTween"] = isTween;
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








/**
 * Check on GSAP presence
 *
 * @returns {boolean}
 */
function has() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__is__["isFunction"])(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.tween) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__is__["isFunction"])(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline);
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

  // has gsap on window object?
  var wTween = window.TweenMax || window.TweenLite;
  var wTimeline = window.TimelineMax || window.TimelineLite;

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__context__["isBrowser"])() && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__is__["isFunction"])(wTween) && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__is__["isFunction"])(wTimeline)) {
    __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.tween = wTween;
    __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline = wTimeline;

    return Promise.resolve();
  }

  // load from cdn
  if (!__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.autoInject) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__debug__["a" /* default */])()) {
      console.warn('\n      \n        It seems that you\'ve disabled autoInject. GSAP cannot be found or loaded by Spirit.\n        Please make sure you provide the tween and timeline to Spirit:\n      \n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n        \n        Or enable the autoInject "spirit.config.gsap.autoInject = true".\n        \n      ');
    }

    return Promise.reject(new Error('GSAP not found.'));
  }

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__debug__["a" /* default */])()) {
    console.warn('\n      \n      GSAP is being fetched from CDN: ' + __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.autoInjectUrl + '.\n      If you already have GSAP installed, please provide it to Spirit:\n      \n        spirit.setup({\n          tween: TweenMax,\n          timeline: TimelineMax\n        })\n      \n      You want to use another cdn? Change it here:\n       \n        spirit.config.gsap.autoInjectUrl = \'https://cdn.xxx\'\n      \n    ');
  }

  return this.loadFromCDN();
}

/**
 * Load GSAP from CDN based on autoInjectUrl
 *
 * @return {Promise<void>}
 */
function loadFromCDN() {
  return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__loadscript__["a" /* default */])(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.autoInjectUrl).then(function () {
    __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.tween = window.TweenMax;
    __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline = window.TimelineMax;

    return Promise.resolve();
  }).catch(function (err) {
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
    return { time: k.time, value: k.value };
  }) || [];

  // add start 50% 50% ?
  if (origins.length > 0 && origins[0].time !== 0 || origins.length === 0) {
    origins.unshift({ time: 0, value: '50% 50%' });
  }

  var current = origins.shift();

  var next = void 0,
      getVal = void 0;

  getVal = function getVal() {
    return { current: current, next: next };
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
  if (!timeline || !(timeline instanceof __WEBPACK_IMPORTED_MODULE_2__group_timeline__["a" /* default */])) {
    throw new Error('Need valid timeline data to generate GSAP timeline from');
  }

  if (timeline.type !== 'dom') {
    throw new Error('Timeline invalid. Needs a timeline with type of dom.');
  }

  if (!has()) {
    throw new Error('GSAP not set. Please make sure GSAP is available.');
  }

  var tl = new __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline({ paused: true }); // eslint-disable-line new-cap

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
        __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.tween.set(targets[i].target, { clearProps: 'all' });
      }
    }
    gsapTimeline.clear();
  }

  return gsapTimeline;
}

function isTimeline(timeline) {
  return timeline && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__is__["isFunction"])(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline) && timeline instanceof __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.timeline;
}

function isTween(tween) {
  return tween && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__is__["isFunction"])(__WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.tween) && tween instanceof __WEBPACK_IMPORTED_MODULE_0__config_config__["a" /* default */].gsap.tween;
}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(3);
/* unused harmony export req */
/* unused harmony export cache */


var req = {};
var cache = {};

/**
 * JSON Loader.
 * Optimize requests by caching results based on url.
 *
 * @param   {string} url
 * @returns {Promise}
 */
/* harmony default export */ exports["a"] = function (url) {
  // only run in browser
  if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__context__["isBrowser"])()) {
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

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__context__ = __webpack_require__(3);
/* harmony export (immutable) */ exports["a"] = ArrayLike;
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }



function ArrayLike(targetClass, list) {
  return function (_targetClass) {
    _inherits(_class, _targetClass);

    _createClass(_class, null, [{
      key: 'name',
      get: function get() {
        return targetClass.name;
      }
    }]);

    function _class() {
      var _ref;

      var _ret2;

      _classCallCheck(this, _class);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

      if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__context__["isBrowser"])() && !('Proxy' in window)) {
        var _ret;

        return _ret = _this, _possibleConstructorReturn(_this, _ret);
      }

      _this[Symbol.iterator] = function () {
        var index = -1;
        var l = this[list];

        return {
          next: function next() {
            return { value: l[++index], done: !(index in l) };
          }
        };
      };

      return _ret2 = new Proxy(_this, {
        get: function get(target, key, receiver) {
          var isIndex = false;

          try {
            isIndex = Number.isInteger(parseInt(key));
          } catch (err) {}

          if (isIndex) {
            return _this[list][key];
          }

          if (key === Symbol.iterator) {
            return _this[Symbol.iterator];
          } else {
            return Reflect.get(_this, key, receiver);
          }
        }
      }), _possibleConstructorReturn(_this, _ret2);
    }

    return _class;
  }(targetClass);
}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__debug__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__xpath__ = __webpack_require__(22);
/* harmony export (immutable) */ exports["resolveElement"] = resolveElement;



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
    transformObject = root.querySelector('[data-spirit-id="' + id + '"]');
  }

  if (!transformObject && path) {
    transformObject = __WEBPACK_IMPORTED_MODULE_1__xpath__["getElement"](path, root === document.body ? undefined : root);
  }

  if (!transformObject) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__debug__["a" /* default */])()) {
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

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
		 * @memberof mitt
		 */
		emit: function emit(type        , evt     ) {
			(all[type] || []).map(function (handler) { handler(evt); });
			(all['*'] || []).map(function (handler) { handler(type, evt); });
		}
	};
}

/* harmony default export */ exports["a"] = mitt;
//# sourceMappingURL=mitt.es.js.map


/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config_config__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config_setup__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__registry_registry__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__data_parser__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loadAnimation__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__utils_debug__ = __webpack_require__(6);
/* harmony export (binding) */ __webpack_require__.d(exports, "version", function() { return version; });


var version = '2.2.5';








var Spirit = function Spirit() {};

Spirit.prototype = {
  config: __WEBPACK_IMPORTED_MODULE_1__config_config__["a" /* default */],
  version: version,
  setup: __WEBPACK_IMPORTED_MODULE_2__config_setup__["a" /* default */],
  groups: __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a" /* default */],
  create: __WEBPACK_IMPORTED_MODULE_4__data_parser__["a" /* create */],
  load: __WEBPACK_IMPORTED_MODULE_4__data_parser__["b" /* load */],
  loadAnimation: __WEBPACK_IMPORTED_MODULE_5__loadAnimation__["a" /* default */]
};

/* harmony reexport (binding) */ __webpack_require__.d(exports, "groups", function() { return __WEBPACK_IMPORTED_MODULE_3__registry_registry__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "config", function() { return __WEBPACK_IMPORTED_MODULE_1__config_config__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "setup", function() { return __WEBPACK_IMPORTED_MODULE_2__config_setup__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "create", function() { return __WEBPACK_IMPORTED_MODULE_4__data_parser__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "load", function() { return __WEBPACK_IMPORTED_MODULE_4__data_parser__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(exports, "loadAnimation", function() { return __WEBPACK_IMPORTED_MODULE_5__loadAnimation__["a"]; });


var spirit = new Spirit();

module.exports = spirit;

if (__WEBPACK_IMPORTED_MODULE_0__utils__["d" /* context */].isBrowser() && !window.spirit) {
  window.spirit = spirit;

  if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__utils_debug__["a" /* default */])()) {
    console.warn('You are running the development build of Spirit v' + version + '.');
  }
}

/***/ }
/******/ ])
});
;
//# sourceMappingURL=spirit.js.map