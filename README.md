Marionette Lite v0.0.5
======================
[![Build Status](https://travis-ci.org/noveogroup-amorgunov/marionette-lite.svg?branch=master)](https://travis-ci.org/noveogroup-amorgunov/marionette-lite) [![downloads](https://img.shields.io/npm/dm/marionette-lite.svg)](https://www.npmjs.com/package/marionette-lite) [![version](https://img.shields.io/npm/v/marionette-lite.svg)]() [![license](https://img.shields.io/npm/l/marionette-lite.svg)]()

This project provides a prepared components for simplified work with **Backbone.Marionette**. In examples used **ES6 syntax**, but you can use components with **ES5** (transform for ES5 with babel).

**Main features:**

1. Controller with filters (before, afrer, async, for authorizate and so on) `[since v0.0.4]`
2. Error route and add route events `[since v0.0.4]`
3. Cached collection and model (in the localStorage or memory) `[since v0.0.5]`
4. Container `fetch`, `destroy` methods to `fetchPromise` and `destroyPromise` `[since v0.0.5]`
5. `@todo` Add examples of using
6. `@todo` Add cached mixin to model and fix choose way of storage

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

###Model and Collection
It's origin backbone Model and Collection with methods `fetchPromise` and `fetchDestroy` for wrapper origin method to promise.

```javascript
import { Collection } from 'marionette-lite';

const MyCollection = Collection.extends({});
/* ... */

const collection = new MyCollection();
collection.fetchPromise().then(() => ());
```

###Cache mixin

`CacheMixin` is used to cache response of collection's fetch method using memory storage. Recommend to use for collection, which don't change over time
Warning: `"cacheKey"` property should be defined in the collection.

Example:
```javascript
import { Collection, Model, CacheMixin } from 'marionette-lite';

const Language = Model.extend({ /* ... */ });
const Languages = Collection.extend({
  model: Language,

  // required attribute as key at storage
  cacheKey: 'languages',

  // If "cacheFetching" is true, the collection would be fetched once time
  // by default is false
  cacheFetching: false
});

_.extend(Languages.prototype, CacheMixin);
```

In other module:

```javascript
import { Languages } from {{path_to_languages_collection}};

const collection = new Languages();
collection.fetchPromise(); // first time collection is fetched from server

// if cacheFetching is true or fetchPromise is called with {cache: true},
// the data is loaded from memory
collection.fetchPromise({cache: true}); // collection isn't fetched from server

// collection is fetched from server again, because cacheFetching = false
// and cache from options is undefined
collection.fetchPromise();
```

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

    // it's possible to use regex to match the route
    fooAuth: [/(.*)\/foo$/]

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
