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

import _ from 'underscore';
import Backbone from 'backbone';

let instance = null;

// Storage is singelton for caching data by key and using Backbone.Events.
// Used to store a collections data in collection/mixins/mixin.cache
const Storage = function Storage() {
  if (instance instanceof Storage) {
    return instance;
  }
  instance = this;

  // memory storage init once (when running the app)
  this._storage = {};
};

_.extend(Storage.prototype, Backbone.Events, {
  _serialize(value) {
    return JSON.stringify(value);
  },
  _deserialize(value) {
    if (typeof value !== 'string') { return undefined; }
    try {
      return JSON.parse(value);
    } catch (e) {
      return value;
    }
  },
  put(key, value) {
    this.trigger('put', key, value);
    this._storage[key] = this._serialize(value);
  },
  has(key) {
    const isHas = typeof this._storage[key] !== 'undefined';
    this.trigger('has', key, isHas);
    return isHas;
  },
  find(key) {
    const value = this._deserialize(this._storage[key]);
    this.trigger('find', key, value);
    return value;
  },
  remove(key) {
    const value = this._storage[key];
    this.trigger('remove', key, value);
    delete this._storage[key];
    return typeof value !== 'undefined';
  },
  clear() {
    this.trigger('clear');
    this._storage = {};
  }
});

export default Storage;
export {
   Storage,
};
