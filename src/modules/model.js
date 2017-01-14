import Backbone from 'backbone';
import _ from 'underscore';


const Model = Backbone.Model;

Model.prototype.fetchPromise = function fetchPromise(options = {}) {
  return new Promise((resolve, reject) => {
    const successCallback = options.success;
    const errorCallback = options.error;

    this.fetch(_.defaults({
      success(model, response, opt) {
        if (typeof successCallback === 'function') {
          resolve(successCallback.call(this, model, response, opt));
        } else {
          resolve(model);
        }
      },
      error(model, response, opt) {
        if (typeof errorCallback === 'function') {
          reject(errorCallback.call(this, model, response, opt));
        } else {
          reject(response);
        }
      }
    }, options));
  });
};

Backbone.Model.prototype.destroyPromise = function destroyPromise(options = {}) {
  return new Promise((resolve, reject) => {
    const successCallback = options.success;
    const errorCallback = options.error;

    this.destroy(_.defaults({
      success(model, response, opt) {
        if (typeof successCallback === 'function') {
          resolve(successCallback.call(this, model, response, opt));
        } else {
          resolve(model);
        }
      },
      error(model, response, opt) {
        if (typeof errorCallback === 'function') {
          reject(errorCallback.call(this, model, response, opt));
        } else {
          reject(response);
        }
      }
    }, options));
  });
};

Backbone.Model.prototype.savePromise = function savePromise(key, val, options = {}) {
  // todo
};

export default Model;
