var path = require('path');
var Components = require('../components.json');
var nodeExternals = require('webpack-node-externals');
var externals = {};

Object.keys(Components).forEach(function(key) {
  externals[`gokuai-components/packages/${key}`] = `gokuai-components/lib/${key}`;
});

exports.externals = [Object.assign({
  vue: 'vue'
}, externals), nodeExternals()];

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'gokuai-components': path.resolve(__dirname, '../')
};

exports.jsexclude = /node_modules/;

exports.vue = {
  root: 'Vue',
  commonjs: 'vue',
  commonjs2: 'vue',
  amd: 'vue'
};