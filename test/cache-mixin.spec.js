/* global define, it, describe, before, afterEach, beforeEach, sinon */
import assert from 'assert';
import _ from 'underscore';
import Backbone from 'backbone';
import chai from 'chai';
import sinon from 'sinon';

import CacheMixin from '../src/mixins/cache';
import { Collection, Model } from '../src/main';

/* Init */

const MyModel = Model.extend({});
const MyCacheCollection = Collection.extend({
  model: MyModel,

  cacheKey: 'MyCollection',
  cacheFetching: false
});

_.extend(MyCacheCollection.prototype, CacheMixin);


const collection = new MyCacheCollection();

// stub for checking cache
// Backbone.sync is called when to need do the request to storage (ex.: to the server api)
Backbone.sync = function sync(method, model, options) {
  // call success method for add the data to collection and cached it
  options.success({ objects: [{ orders: 0.0, time: '2016-09-09' }] });
  return true;
};


/* Tests */

describe('collections/mixin.cache', () => {
  beforeEach(() => {
    collection.reset();

    // generate a new cache key between the tests
    collection.cacheKey = Math.random().toString(36);
  });

  describe('#fetch', () => {
    it('should be defined', () => {
      chai.assert.isFunction(CacheMixin.fetch);
      chai.assert.isFunction(collection.fetch);
    });

    it('should be called when the cache is enabled', () => {
      const spy = sinon.spy(collection, 'fetch');

      collection.fetchPromise();
      sinon.assert.calledOnce(spy);
      collection.fetch.restore();
    });

    it('should be called with the option: {cache: true}', () => {
      const spy = sinon.spy(collection, 'fetch');

      collection.fetchPromise({ cache: true });

      // sinon.assert.calledWith(spy, {cache: true});
      assert.equal(spy.getCall(0).args[0].cache, true);
      collection.fetch.restore();
    });
  });

  describe('#sync', () => {
    it('should be called once when cache is enabled', () => {
      const spy = sinon.spy(collection, 'sync');

      collection.fetchPromise({ cache: true });
      collection.fetchPromise({ cache: true });
      collection.fetchPromise({ cache: true });

      sinon.assert.calledOnce(spy);
      collection.sync.restore();
    });

    it('should be called twice without caching', () => {
      const spy = sinon.spy(collection, 'sync');

      collection.fetchPromise();
      collection.fetchPromise();

      sinon.assert.calledTwice(spy);
      collection.sync.restore();
    });

    it('shouldn\'t be called in other instance when cache is enabled', () => {
      collection.cacheKey = 'MyCollection'; // cache key by default
      collection.fetchPromise();

      // ...

      const collection2 = new MyCacheCollection();
      const spy = sinon.spy(collection2, 'sync');

      collection2.fetchPromise({ cache: true });
      collection2.fetchPromise({ cache: true });

      sinon.assert.callCount(spy, 0);
      collection2.sync.restore();
    });
  });
});
