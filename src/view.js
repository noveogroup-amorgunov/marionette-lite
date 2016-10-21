import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

const View = Marionette.View.extend({
  close() {
    this.remove();
    this.unbind();
    if (this.onClose) {
      this.onClose();
    }
  }
});

export default View;
export { View }