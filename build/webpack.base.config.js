'use strict'

const config = require('./config')

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: config.alias
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        enforce: 'pre'
      }, {
        test: /\.(js|jsx)$/,
        exclude: config.jsexclude,
        loader: 'babel-loader'
      }, {
        test: /\.swf$/,
        loader: 'file-loader'
      }
    ]
  }
}