'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const Components = require('../components.json')
const utils = require('./utils')
const config = require('./config')

module.exports = merge(baseConfig, {
  mode: 'production',

  entry: Components,

  output: {
    path: utils.resolve('./lib'),
    publicPath: '/dist/',
    filename: '[name].js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },

  resolve: {
    modules: ['node_modules']
  },

  externals: config.externals
});