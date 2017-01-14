import { Controller } from './controller.js';
import { Filter } from './filter.js';
import { Router } from './router.js';
import { View } from './view.js';
import { Model } from './modules/model.js';
import { Collection } from './modules/collection.js';

const MarionetteLite = {
  Router,
  Controller,
  View,
  Filter,
  Model,
  Collection
};

export default MarionetteLite;
export { Router };
export { Controller };
export { View };
export { Filter };
