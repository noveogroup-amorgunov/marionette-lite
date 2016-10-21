Marionette Lite v0.0.4
======================
[![Build Status](https://travis-ci.org/noveogroup-amorgunov/marionette-lite.svg?branch=master)](https://travis-ci.org/noveogroup-amorgunov/marionette-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](#)

This project provides a prepared components for simplified work with **Backbone.Marionette**. In examples used **ES5 syntax**, but you can use components with **ES3**. 

**Main features:**

1. Controller with filters (before, afrer, async, for authorizate and so on) `[since v0.0.4]`
2. Error route and add route events `[since v0.0.4]`
3. Cached collection and model (in the localStorage or memory) `[since v0.0.5]`
4. Container `fetch`, `destroy` methods to `fetchPromise` and `destroyPromise` `[since v0.0.6]`

**Depndencies**: Marionette >=3

Installation
-----

Add the script to the page after backbone.marionette.js has been included:
```html
<script src="/path/to/backbone.marionette.js"></script>
<script src="/path/to/marionette-lite.js"></script>
```
or if you're using **AMD**, require the script as a module:

```javascript
require(['path/to/marionette-lite.js']);
```
Note that the **AMD module** depends on underscore, backbone, marionette modules being defined as it lists them as dependencies. If you don't have these mapped, you can do it by adding the following to your require config:
```javascript
requirejs.config({
  paths: {
    backbone: 'actual/path/to/backbone.js',
    underscore: 'actual/path/to/underscore.js'
  }
});
```

If you are using **CommonJS** or **ES5 modules**, install via `npm`:

```bash
npm install marionette-lite --save
```

then require it in your modules:
```javascript
// CommonJS
var marionette-lite = require('marionette-lite');

//ES5 modules
import * as MarionetteLite from 'marionette-lite';
// or include some components:
import { Router, Controller, /* ... */ } from 'marionette-lite';
```

Usage
------

###Filter

`filters` works by overriding `Backbone.Router.prototype.route` method. Whenever a router's `route` method is called, its wraps the route callback (or route handler) that's passed in a 'wrapper handler', that calls before or after "filters" you have written along with the original route callback. So, we used **marionette**, `filters` is set into `controller`

You have the ability to define functions to be run before and after a route has fired. This has huge benefits for keeping Router flexible. To define a before and after filter, simply create respectively named objects on your `Controller` along with a key/val set matching filter and controller's action.

Example:
```javascript
import { Filter } from 'marionette-lite';

const RequresAuthFilter = Filter.extend({
  // name is used in controller for detect filter
  name: 'requresAuth',
  
  // async mode
  async: true,
  
  // by default execute before routing trigger
  execution: Filter.Before, 
  
  // func which fired as filter
  handler(fragment, args, next) {
    // Requesting server to check if user is authorised
    $.ajax({
      url: '/auth',
      success: () => {
        this.isSignedIn = true;
        next();
      },
      error: () => {
        Backbone.navigate('login', true);
      }
    });
  },
});
```
or
```javascript
import { Filter } from 'marionette-lite';

const GoogleTrackPageView = Filter.extend({
  name: 'googleTrackPageView',
  execution: Filter.After, 
  handler(fragment, args) {
    /* Google analytics tracking handlers */
    return true;
  },
});
```

If you want use `async` handlers, you should calling `next` callback (third argument) when filter finished.
If you use `sync` handler (by default), you should return `true` to continue route handling or return `false` (e.g. call `Backbone.navigate('login', true)`) 

####How use it in your project ?

You should use `Router` from this package (extended from `Marionette.AppRouter`) and add filters to your controller as:

```javascript
import { Router } from 'marionette-lite';
const AwesomeRouter = Router.extend({ /* add your routes */ });
// ....

import * as Filters from './{path/to/your/filters}'; // include your filters

// create array with your filters
const filtersMap = () => [
  new Filters.RequresAuth(),
  new Filters.PreventAccessWhenAuth(),
  new Filters.GoogleTrackPageView()
];

const AwesomeController = Marionette.Object.extend({
  // Add available filters map
  filtersMap,

  filters: {
    // e.g. Action that need authentication and if user is not authenticated 
    // gets redirect to login page
    requresAuth: ['logout', 'user'],

    // e.g. Action that shouldn't be accessible if user is authenticated
    // for example, login, register, forgetpasword ...
    preventAccessWhenAuth: ['login', 'signup'],

    // Can use `*` for all actions
    // e.g.Google analytics tracking
    googleTrackPageView: ['*']
  },

  // actions
  home() { this.changeView(new HomeView()); },
  
  login() { this.changeView(new LoginView()); },
  
  signup() { this.changeView(new SignUpView()); },
  
  user(id) {
    const user = new Models.User({ id });
    user.fetch({
      success: () => this.changeView(new UserView(id)),
      error: () => false // handle error
    });
  }
});

```

API
------

soon...

Development
-----
Clone the repository and install the dependencies. Do not forget to install globally `webpack` if installed yet.

    $ git clone https://github.com/noveogroup-amorgunov/marionette-lite my-project
    $ cd my-project
    $ npm install

To build the project run the follow command. It will compile the project and put the result under `dist` directory. Also it will watch files changes and compile project again. 

    $ npm run bundle
    $ npm run watch #run webpack with watching

To test project run:

    $ npm test
