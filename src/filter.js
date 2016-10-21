import Marionette from 'backbone.marionette';

const BEFORE = 'before';
const AFTER = 'after';

const Filter = Marionette.Object.extend({
  execution: BEFORE,
  name: false,
  async: false,
  handler: ((fragment, args, next) => next())
});

Filter.Before = BEFORE;
Filter.After = AFTER;

export default Filter;
export { Filter };
