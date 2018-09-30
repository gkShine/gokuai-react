'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const utils = require('./utils')
const config = require('./config')

module.exports = merge(baseConfig, {
  mode: 'development',

  entry: {
    app: ['./examples/main.js']
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
  devServer: {
    clientLogLevel: 'warning',
    hot: true,
    contentBase: 'dist',
    compress: true,
    host: 'localhost',
    port: '8082',
    open: true,
    overlay: {warnings: false, errors: true},
    publicPath: '/',
    quiet: true,
    watchOptions: {
      poll: true
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'examples/index.html',
      inject: true
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
});