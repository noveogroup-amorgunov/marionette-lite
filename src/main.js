// import Backbone from 'backbone';
// import Marionette from 'backbone.marionette';
// import _ from 'underscore';

const Router = Marionette.AppRouter.extend({
  before(router, fragment, args, callback) {
    const controller = this._getController();
    let options = {};

    if (_.isFunction(controller.checkAccess)) {
      const requresAuth = controller.requresAuth || (() => []);
      const preventAccessWhenAuth = controller.preventAccessWhenAuth || (() => []);

      if (requresAuth().indexOf(fragment) !== -1) {
        options = _.extend(options, { requiresAuth: true });
      }

      if (preventAccessWhenAuth().indexOf(fragment) !== -1) {
        options = _.extend(options, { preventAccessWhenAuth: true });
      }
    }

    if (!_.isEmpty(options)) {
      return controller.checkAccess(fragment, options, () => callback.call(router));
    }
    return callback.call(router);
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

      this.before(router, fragment, args, () => {
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, [`route: ${name}`].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
    });
    return this;
  },
});

export default Router;
export { Router }
