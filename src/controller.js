import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import _ from 'underscore';

const Controller = Marionette.Object.extend({

  initialize(props) {
    this.layout = props.layout;
  },

  go(fragment) {
    Backbone.navigate(fragment, true);
  },

  // if route is changed, current view will be changed too
  changeView(view) {
    // Close and unbind any existing page view
    if (this.currentView && _.isFunction(this.currentView.close)) {
      this.currentView.close();
    }

    // Establish the requested view into scope
    this.currentView = view;

    // Re-delegate events (unbound when closed)
    this.currentView.delegateEvents(this.currentView.events);

    this.layout.showChildView('main', view);
  }
});

export default Controller;
export { Controller }