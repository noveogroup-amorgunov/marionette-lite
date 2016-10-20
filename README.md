Marionette Lite
======================
[![Build Status](https://travis-ci.org/noveogroup-amorgunov/marionette-lite.svg?branch=master)](https://travis-ci.org/noveogroup-amorgunov/marionette-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](#)

This project provides a prepared components for simplified work with **Backbone.Marionette**.

**Main features:**

1. Controller with filters (before, afrer, for authorizate and so on) `[since v0.0.4]`
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

soon...


API
------

soon...

Development
-----
Clone the repository and install the dependencies. Do not forget to install globally `webpack` if installed yet.

    $ git clone https://github.com/noveogroup-amorgunov/marionette-es6 my-project
    $ cd my-project
    $ npm install

To build the project run the follow command. It will compile the project and put the result under `dist` directory. Also it will watch files changes and compile project again. 

    $ npm run bundle
    $ npm run watch #run webpack with watching

To test project run:

    $ npm test
