'use strict';

require('./polyfills');

var adapter = require('./adapter-factory');
var plugin = require('./plugin-decorator');
var defaultFactory = require('./default');

// functions for the default tree implementation
var fn = defaultFactory();

var tree = function tree(value) {
  return fn.api(fn.createNode(value));
};

Object.assign(tree, fn, { adapter: adapter, plugin: plugin });

module.exports = tree;