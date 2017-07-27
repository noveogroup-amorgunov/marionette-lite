import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

import { Filter } from './filter.js';

const Router = Marionette.AppRouter.extend({
  runFilters(type, router, fragment, args, callback) {
    const controller = this._getController();
    const filters = controller.filtersMap();
    const beforeFilters = filters.filter(filter => filter.execution === type);
    const chain = [];
    beforeFilters.map((filter) => {
      const actions = controller.filters[filter.name] || [];
      const all = actions.length === 1 && actions[0] === '*';
      console.log('checkRegex', this.checkRegex(actions, fragment));
      if (all || (actions.indexOf(fragment) !== -1 && _.isFunction(filter.handler)) || this.checkRegex(actions, fragment)) {
        chain.push(filter);
      }
    });

    for (let i = 0; i < chain.length - 1; i++) {
      chain[i].handler.bind(fragment, chain[i + 1].handler);
    }
    this.run(chain, router, fragment, args, callback);
  },
  checkRegex(actions, fragment) {
    return !!_.find(actions, (action) => {
      if (action instanceof RegExp) {
        return RegExp(action).test(fragment);
      }
    });
  },
  run(chain, router, fragment, args, callback) {
    // When filters chain is finished - calling done callback
    if (!chain.length) {
      callback.call(router);
      return;
    }

    const current = chain[0];
    const tail = _.tail(chain);
    const next = () => this.run(tail, router, fragment, args, callback);

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

  route(route, name, callback) {
    if (!_.isRegExp(route)) {
      route = this._routeToRegExp(route);
    }
    if (_.isFunction(name)) {
      callback = name;
      name = '';
    }
    if (!callback) {
      callback = this[name];
    }
    const router = this;
    Backbone.history.route(route, (fragment) => {
      const args = router._extractParameters(route, fragment);
      this.runFilters(Filter.Before, router, fragment, args, () => {
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, [`route: ${name}`].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
          this.runFilters(Filter.After, router, fragment, args, () => {});
        }
      });
    });
    return this;
  },
});

export default Router;
export { Router };
