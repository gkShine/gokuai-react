'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const utils = require('./utils')
const config = require('./config');

module.exports = merge(baseConfig, {
  mode: 'production',

  entry: {
    app: ['./src/index.js']
  },

  output: {
    path: utils.resolve('./lib'),
    publicPath: '/dist/',
    filename: 'index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'umd',
    library: 'GOKUAI',
    umdNamedDefine: true
  },

  externals: {
    vue: config.vue
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});