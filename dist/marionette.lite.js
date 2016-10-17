(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("marionette-lite", [], factory);
	else if(typeof exports === 'object')
		exports["marionette-lite"] = factory();
	else
		root["marionette-lite"] = factory();
})(this, function() {
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
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// import Backbone from 'backbone';
	// import Marionette from 'backbone.marionette';
	// import _ from 'underscore';

	var Router = Marionette.AppRouter.extend({
	  before: function before(router, fragment, args, callback) {
	    var controller = this._getController();
	    var options = {};

	    if (_.isFunction(controller.checkAccess)) {
	      var requresAuth = controller.requresAuth || function () {
	        return [];
	      };
	      var preventAccessWhenAuth = controller.preventAccessWhenAuth || function () {
	        return [];
	      };

	      if (requresAuth().indexOf(fragment) !== -1) {
	        options = _.extend(options, { requiresAuth: true });
	      }

	      if (preventAccessWhenAuth().indexOf(fragment) !== -1) {
	        options = _.extend(options, { preventAccessWhenAuth: true });
	      }
	    }

	    if (!_.isEmpty(options)) {
	      return controller.checkAccess(fragment, options, function () {
	        return callback.call(router);
	      });
	    }
	    return callback.call(router);
	  },
	  route: function route(_route, name, callback) {
	    var _this = this;

	    if (!_.isRegExp(_route)) {
	      _route = this._routeToRegExp(_route);
	    }
	    if (_.isFunction(name)) {
	      callback = name;
	      name = '';
	    }
	    if (!callback) {
	      callback = this[name];
	    }
	    var router = this;
	    Backbone.history.route(_route, function (fragment) {
	      var args = router._extractParameters(_route, fragment);

	      _this.before(router, fragment, args, function () {
	        if (router.execute(callback, args, name) !== false) {
	          router.trigger.apply(router, ['route: ' + name].concat(args));
	          router.trigger('route', name, args);
	          Backbone.history.trigger('route', router, name, args);
	        }
	      });
	    });
	    return this;
	  }
	});

	exports.default = Router;
	exports.Router = Router;

/***/ }
/******/ ])
});
;