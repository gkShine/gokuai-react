'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const utils = require('./utils')
const config = require('./config');

module.exports = merge(baseConfig, {
  mode: 'production',

  entry: {
    app: ['./examples/main.js']
  },

  output: {
    path: utils.resolve('./demo'),
    filename: 'index.js',
    chunkFilename: '[id].js'
  },

  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }, {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", {
          loader: 'postcss-loader',
          options: {
            plugins: (loader) => [
              require('autoprefixer')(), //CSS浏览器兼容
            ]
          }
        }, "sass-loader"]
      }
    ]
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: config.alias
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: 'examples/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
});