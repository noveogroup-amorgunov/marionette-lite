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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Filter = exports.View = exports.Controller = exports.Router = undefined;

	var _controller = __webpack_require__(1);

	var _filter = __webpack_require__(5);

	var _router = __webpack_require__(6);

	var _view = __webpack_require__(7);

	var MarionetteLite = {
	  Router: _router.Router,
	  Controller: _controller.Controller,
	  View: _view.View,
	  Filter: _filter.Filter
	};

	exports.default = MarionetteLite;
	exports.Router = _router.Router;
	exports.Controller = _controller.Controller;
	exports.View = _view.View;
	exports.Filter = _filter.Filter;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

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
	    var controller = this._getController();
	    var filters = controller.filtersMap();
	    var beforeFilters = filters.filter(function (filter) {
	      return filter.execution === type;
	    });
	    var chain = [];

	    beforeFilters.map(function (filter) {
	      var actions = controller.filters[filter.name] || [];
	      var all = actions.length === 1 && actions[0] === '*';
	      if (all || actions.indexOf(fragment) !== -1 && _underscore2.default.isFunction(filter.handler)) {
	        chain.push(filter);
	      }
	    });

	    for (var i = 0; i < chain.length - 1; i++) {
	      chain[i].handler.bind(fragment, chain[i + 1].handler);
	    }
	    this.run(chain, router, fragment, args, callback);
	  },
	  run: function run(chain, router, fragment, args, callback) {
	    var _this = this;

	    // When filters chain is finished - calling done callback
	    if (!chain.length) {
	      callback.call(router);
	      return;
	    }

	    var current = chain[0];
	    var tail = _underscore2.default.tail(chain);
	    var next = function next() {
	      return _this.run(tail, router, fragment, args, callback);
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
	    var _this2 = this;

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
	      _this2.runFilters(_filter.Filter.Before, router, fragment, args, function () {
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route: ' + name].concat(args));
	          router.trigger('route', name, args);
	          _backbone2.default.history.trigger('route', router, name, args);
	          _this2.runFilters(_filter.Filter.After, router, fragment, args, function () {});
	        }
	      });
	    });
	    return this;
	  }
	});

	exports.default = Router;
	exports.Router = Router;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

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

/***/ }
/******/ ])
});
;