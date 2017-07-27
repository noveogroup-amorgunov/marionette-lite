(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("backbone"), require("backbone.marionette"), require("underscore"));
	else if(typeof define === 'function' && define.amd)
		define("marionette-lite", ["backbone", "backbone.marionette", "underscore"], factory);
	else if(typeof exports === 'object')
		exports["marionette-lite"] = factory(require("backbone"), require("backbone.marionette"), require("underscore"));
	else
		root["marionette-lite"] = factory(root["backbone"], root["backbone.marionette"], root["underscore"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.CacheMixin = exports.Collection = exports.Model = exports.Filter = exports.View = exports.Controller = exports.Router = undefined;

	var _controller = __webpack_require__(1);

	var _filter = __webpack_require__(5);

	var _router = __webpack_require__(6);

	var _view = __webpack_require__(7);

	var _model = __webpack_require__(8);

	var _collection = __webpack_require__(9);

	var _cache = __webpack_require__(10);

	var MarionetteLite = {
	  Router: _router.Router,
	  Controller: _controller.Controller,
	  View: _view.View,
	  Filter: _filter.Filter,
	  Model: _model.Model,
	  Collection: _collection.Collection,
	  CacheMixin: _cache.CacheMixin
	};

	exports.default = MarionetteLite;
	exports.Router = _router.Router;
	exports.Controller = _controller.Controller;
	exports.View = _view.View;
	exports.Filter = _filter.Filter;
	exports.Model = _model.Model;
	exports.Collection = _collection.Collection;
	exports.CacheMixin = _cache.CacheMixin;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Controller = undefined;

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(3);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Controller = _backbone4.default.Object.extend({
	  initialize: function initialize(props) {
	    this.layout = props.layout;
	  },
	  go: function go(fragment) {
	    _backbone2.default.navigate(fragment, true);
	  },


	  // if route is changed, current view will be changed too
	  changeView: function changeView(view) {
	    // Close and unbind any existing page view
	    if (this.currentView && _underscore2.default.isFunction(this.currentView.close)) {
	      this.currentView.close();
	    }

	    // Establish the requested view into scope
	    this.currentView = view;

	    // Re-delegate events (unbound when closed)
	    this.currentView.delegateEvents(this.currentView.events);

	    this.layout.showChildView('main', view);
	  }
	});

	exports.default = Controller;
	exports.Controller = Controller;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Filter = undefined;

	var _backbone = __webpack_require__(3);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var BEFORE = 'before';
	var AFTER = 'after';

	var Filter = _backbone2.default.Object.extend({
	  execution: BEFORE,
	  name: false,
	  async: false,
	  handler: function handler(fragment, args, next) {
	    return next();
	  }
	});

	Filter.Before = BEFORE;
	Filter.After = AFTER;

	exports.default = Filter;
	exports.Filter = Filter;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Router = undefined;

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(3);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _filter = __webpack_require__(5);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Router = _backbone4.default.AppRouter.extend({
	  runFilters: function runFilters(type, router, fragment, args, callback) {
	    var _this = this;

	    var controller = this._getController();
	    var filters = controller.filtersMap();
	    var beforeFilters = filters.filter(function (filter) {
	      return filter.execution === type;
	    });
	    var chain = [];
	    beforeFilters.map(function (filter) {
	      var actions = controller.filters[filter.name] || [];
	      var all = actions.length === 1 && actions[0] === '*';
	      if (all || actions.indexOf(fragment) !== -1 && _underscore2.default.isFunction(filter.handler) || _this.checkRegex(actions, fragment)) {
	        chain.push(filter);
	      }
	    });

	    for (var i = 0; i < chain.length - 1; i++) {
	      chain[i].handler.bind(fragment, chain[i + 1].handler);
	    }
	    this.run(chain, router, fragment, args, callback);
	  },
	  checkRegex: function checkRegex(actions, fragment) {
	    return !!_underscore2.default.find(actions, function (action) {
	      if (action instanceof RegExp) {
	        return RegExp(action).test(fragment);
	      }
	    });
	  },
	  run: function run(chain, router, fragment, args, callback) {
	    var _this2 = this;

	    // When filters chain is finished - calling done callback
	    if (!chain.length) {
	      callback.call(router);
	      return;
	    }

	    var current = chain[0];
	    var tail = _underscore2.default.tail(chain);
	    var next = function next() {
	      return _this2.run(tail, router, fragment, args, callback);
	    };

	    // if (_.isString(current)) {
	    //   current = router[current];
	    // }

	    if (current.async) {
	      // Filter expects next for async - ignoring return value
	      // and waiting for next to be called
	      current.handler.apply(router, [fragment, args, next]);
	    } else {
	      // Using regular filter with return false value that stops filters execution
	      if (current.handler.apply(router, [fragment, args]) !== false) {
	        next();
	      }
	    }
	  },
	  route: function route(_route, name, callback) {
	    var _this3 = this;

	    if (!_underscore2.default.isRegExp(_route)) {
	      _route = this._routeToRegExp(_route);
	    }
	    if (_underscore2.default.isFunction(name)) {
	      callback = name;
	      name = '';
	    }
	    if (!callback) {
	      callback = this[name];
	    }
	    var router = this;
	    _backbone2.default.history.route(_route, function (fragment) {
	      var args = router._extractParameters(_route, fragment);
	      _this3.runFilters(_filter.Filter.Before, router, fragment, args, function () {
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route: ' + name].concat(args));
	          router.trigger('route', name, args);
	          _backbone2.default.history.trigger('route', router, name, args);
	          _this3.runFilters(_filter.Filter.After, router, fragment, args, function () {});
	        }
	      });
	    });
	    return this;
	  }
	});

	exports.default = Router;
	exports.Router = Router;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.View = undefined;

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(3);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var View = _backbone4.default.View.extend({
	  close: function close() {
	    this.remove();
	    this.unbind();
	    if (this.onClose) {
	      this.onClose();
	    }
	  }
	});

	exports.default = View;
	exports.View = View;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Model = undefined;

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Model = _backbone2.default.Model;

	Model.prototype.fetchPromise = function fetchPromise() {
	  var _this = this;

	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  return new Promise(function (resolve, reject) {
	    var successCallback = options.success;
	    var errorCallback = options.error;

	    _this.fetch(_underscore2.default.defaults({
	      success: function success(model, response, opt) {
	        if (typeof successCallback === 'function') {
	          resolve(successCallback.call(this, model, response, opt));
	        } else {
	          resolve(model);
	        }
	      },
	      error: function error(model, response, opt) {
	        if (typeof errorCallback === 'function') {
	          reject(errorCallback.call(this, model, response, opt));
	        } else {
	          reject(response);
	        }
	      }
	    }, options));
	  });
	};

	Model.prototype.destroyPromise = function destroyPromise() {
	  var _this2 = this;

	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  return new Promise(function (resolve, reject) {
	    var successCallback = options.success;
	    var errorCallback = options.error;

	    _this2.destroy(_underscore2.default.defaults({
	      success: function success(model, response, opt) {
	        if (typeof successCallback === 'function') {
	          resolve(successCallback.call(this, model, response, opt));
	        } else {
	          resolve(model);
	        }
	      },
	      error: function error(model, response, opt) {
	        if (typeof errorCallback === 'function') {
	          reject(errorCallback.call(this, model, response, opt));
	        } else {
	          reject(response);
	        }
	      }
	    }, options));
	  });
	};

	Model.prototype.savePromise = function savePromise(key, val) {
	  // todo

	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	};

	exports.default = Model;
	exports.Model = Model;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Collection = undefined;

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _model = __webpack_require__(8);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Collection = _backbone2.default.Collection;

	Collection.prototype.fetchPromise = function fetchPromise() {
	  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	  return _model.Model.prototype.fetchPromise.call(this, options);
	};

	exports.default = Collection;
	exports.Collection = Collection;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _collection = __webpack_require__(9);

	var _storage = __webpack_require__(11);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// CacheMixin is used to cache response of collection's fetch method using memory storage
	// Used in Language collection, for collections which are applied as select options and so on.
	// Warning: "cacheKey" property should be defined in the collection.
	var CacheMixin = {

	  cachePrefix: 'collection',

	  // Override sync and try to clear cache items if it looks like they are being updated.
	  sync: function sync(method, model, options) {
	    var parent = _collection.Collection.prototype.sync;

	    // Only empty the cache if we're doing a create, update, patch or delete.
	    if (method !== 'read' && this.cacheKey) {
	      var storage = new _storage.Storage();
	      var cacheKey = this.cachePrefix + '-' + this.cacheKey;

	      // Empty cache by key
	      storage.remove(cacheKey);
	    }

	    return parent.apply(this, arguments);
	  },
	  fetch: function fetch() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    var parent = _collection.Collection.prototype.fetch;
	    var storage = new _storage.Storage();
	    var success = options.success;
	    var isCache = options.cache;

	    // No cache for this collection, calling the original fetch
	    if (!this.cacheKey) {
	      return parent.call(this, options);
	    }

	    var cacheKey = this.cachePrefix + '-' + this.cacheKey;

	    // If the collection has required info for cache
	    if (isCache || this.cacheFetching) {
	      // Checking whether the cache object already holds the required data
	      if (storage.has(cacheKey)) {
	        var response = storage.find(cacheKey);

	        // Do the same as the fetch method does when the data received
	        this.set(this.parse(response, options), options);
	        if (_underscore2.default.isFunction(success)) {
	          success(this, response, options);
	        }

	        // Returns deferred as the original fetch
	        return _backbone2.default.$.Deferred().resolve();
	      }
	    }

	    // The cache object doesn't hold the required data
	    // Preparing success method that set the cache
	    options.success = function (entity, resp, opts) {
	      storage.put(cacheKey, resp);
	      if (_underscore2.default.isFunction(success)) {
	        success(entity, resp, opts);
	      }
	    };

	    // Calling the original fetch
	    return parent.call(this, options);
	  }
	};

	exports.default = CacheMixin;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Storage = undefined;

	var _underscore = __webpack_require__(4);

	var _underscore2 = _interopRequireDefault(_underscore);

	var _backbone = __webpack_require__(2);

	var _backbone2 = _interopRequireDefault(_backbone);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* Example of use:

	  const storage = new Storage();

	  storage.set('username', 'John'); // store 'username' at 'John'
	  storage.set('user', { name: 'Ivan' }); // store an obj literal (uses JSON.stringify under the hood)

	  // ... other module/file/block

	  const storage2 = new Storage();

	  console.log(storage2 === storage); // true

	  storage2.get('username'); // get 'John'
	  storage2.remove('user'); // remove 'user' and return true

	  storage2.clear(); // clear all data
	*/

	var instance = null;

	// Storage is singelton for caching data by key and using Backbone.Events.
	// Used to store a collections data in collection/mixins/mixin.cache
	var Storage = function Storage() {
	  if (instance instanceof Storage) {
	    return instance;
	  }
	  instance = this;

	  // memory storage init once (when running the app)
	  this._storage = {};
	};

	_underscore2.default.extend(Storage.prototype, _backbone2.default.Events, {
	  _serialize: function _serialize(value) {
	    return JSON.stringify(value);
	  },
	  _deserialize: function _deserialize(value) {
	    if (typeof value !== 'string') {
	      return undefined;
	    }
	    try {
	      return JSON.parse(value);
	    } catch (e) {
	      return value;
	    }
	  },
	  put: function put(key, value) {
	    this.trigger('put', key, value);
	    this._storage[key] = this._serialize(value);
	  },
	  has: function has(key) {
	    var isHas = typeof this._storage[key] !== 'undefined';
	    this.trigger('has', key, isHas);
	    return isHas;
	  },
	  find: function find(key) {
	    var value = this._deserialize(this._storage[key]);
	    this.trigger('find', key, value);
	    return value;
	  },
	  remove: function remove(key) {
	    var value = this._storage[key];
	    this.trigger('remove', key, value);
	    delete this._storage[key];
	    return typeof value !== 'undefined';
	  },
	  clear: function clear() {
	    this.trigger('clear');
	    this._storage = {};
	  }
	});

	exports.default = Storage;
	exports.Storage = Storage;

/***/ })
/******/ ])
});
;