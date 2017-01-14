import Backbone from 'backbone';
import Model from './model';

const Collection = Backbone.Collection;

Collection.prototype.fetchPromise = function fetchPromise(options = {}) {
  return Model.prototype.fetchPromise.call(this, options);
};

export default Collection;
