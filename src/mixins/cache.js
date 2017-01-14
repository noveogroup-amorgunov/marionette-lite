import Backbone from 'backbone';
import _ from 'underscore';

import { Collection } from '../modules/collection';
import { Storage } from '../helpers/storage';

// CacheMixin is used to cache response of collection's fetch method using memory storage
// Used in Language collection, for collections which are applied as select options and so on.
// Warning: "cacheKey" property should be defined in the collection.
const CacheMixin = {

  cachePrefix: 'collection',

  // Override sync and try to clear cache items if it looks like they are being updated.
  sync(method, model, options) {
    const parent = Collection.prototype.sync;

    // Only empty the cache if we're doing a create, update, patch or delete.
    if (method !== 'read' && this.cacheKey) {
      const storage = new Storage();
      const cacheKey = `${this.cachePrefix}-${this.cacheKey}`;

      // Empty cache by key
      storage.remove(cacheKey);
    }

    return parent.apply(this, arguments);
  },

  fetch(options = {}) {
    const parent = Collection.prototype.fetch;
    const storage = new Storage();
    const success = options.success;
    const isCache = options.cache;

    // No cache for this collection, calling the original fetch
    if (!this.cacheKey) {
      return parent.call(this, options);
    }

    const cacheKey = `${this.cachePrefix}-${this.cacheKey}`;

    // If the collection has required info for cache
    if (isCache || this.cacheFetching) {
      // Checking whether the cache object already holds the required data
      if (storage.has(cacheKey)) {
        const response = storage.find(cacheKey);

        // Do the same as the fetch method does when the data received
        this.set(this.parse(response, options), options);
        if (_.isFunction(success)) {
          success(this, response, options);
        }

        // Returns deferred as the original fetch
        return Backbone.$.Deferred().resolve();
      }
    }

    // The cache object doesn't hold the required data
    // Preparing success method that set the cache
    options.success = (entity, resp, opts) => {
      storage.put(cacheKey, resp);
      if (_.isFunction(success)) {
        success(entity, resp, opts);
      }
    };

    // Calling the original fetch
    return parent.call(this, options);
  }
};

export default CacheMixin;
