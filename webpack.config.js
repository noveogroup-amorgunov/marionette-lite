const path = require('path');
const webpack = require('webpack');
const cloneDeep = require('lodash.clonedeep')

var defaults = {
  entry: './src/main.js',
  output: {
    path: path.join(__dirname, './'),
    filename: 'dist/marionette.lite.js',
    libraryTarget: 'umd',
    library: 'marionette-lite',
    umdNamedDefine: true
  },
  externals: [
    'jquery',
    'underscore',
    'backbone',
    'backbone.marionette'
  ],
  module: {
    loaders: [{
      test: path.join(__dirname, 'src'),
      exclude: /node_modules|libs|vendor/,
      loader: 'babel-loader',
      query: {
        presets: 'es2015',
      },
    }]
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    root: path.resolve('./src'),
    extensions: ['', '.js'],
  },
  plugins: [
    // Avoid publishing files when compilation fails
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery',
      'window.jQuery': 'jquery',
    })
  ],
};

var minimized = cloneDeep(defaults);

minimized.plugins.push(new webpack.optimize.UglifyJsPlugin());
minimized.output.filename = 'dist/marionette.lite.min.js';

module.exports = [ defaults, minimized ];
