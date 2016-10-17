(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Backbone"), require("Backbone.Marionette"), require("_"));
	else if(typeof define === 'function' && define.amd)
		define(["Backbone", "Backbone.Marionette", "_"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("Backbone"), require("Backbone.Marionette"), require("_")) : factory(root["Backbone"], root["Backbone.Marionette"], root["_"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
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
	exports.Router = undefined;

	var _backbone = __webpack_require__(1);

	var _backbone2 = _interopRequireDefault(_backbone);

	var _backbone3 = __webpack_require__(2);

	var _backbone4 = _interopRequireDefault(_backbone3);

	var _underscore = __webpack_require__(3);

	var _underscore2 = _interopRequireDefault(_underscore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Router = _backbone4.default.AppRouter.extend({
	  before: function before(router, fragment, args, callback) {
	    var controller = this._getController();
	    var options = {};

	    if (_underscore2.default.isFunction(controller.checkAccess)) {
	      var requresAuth = controller.requresAuth || function () {
	        return [];
	      };
	      var preventAccessWhenAuth = controller.preventAccessWhenAuth || function () {
	        return [];
	      };

	      if (requresAuth().indexOf(fragment) !== -1) {
	        options = _underscore2.default.extend(options, { requiresAuth: true });
	      }

	      if (preventAccessWhenAuth().indexOf(fragment) !== -1) {
	        options = _underscore2.default.extend(options, { preventAccessWhenAuth: true });
	      }
	    }

	    if (!_underscore2.default.isEmpty(options)) {
	      return controller.checkAccess(fragment, options, function () {
	        return callback.call(router);
	      });
	    }
	    return callback.call(router);
	  },
	  route: function route(_route, name, callback) {
	    var _this = this;

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

	      _this.before(router, fragment, args, function () {
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route: ' + name].concat(args));
	          router.trigger('route', name, args);
	          _backbone2.default.history.trigger('route', router, name, args);
	        }
	      });
	    });
	    return this;
	  }
	});

	exports.default = Router;
	exports.Router = Router;

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;