'use strict';

require('./polyfills');

var defaultAdapter = require('./adapter/default');
var fnFactory = require('./fn-factory');

var parentMap = require('./plugins/parent-map');
var serializer = require('./plugins/serializer');
var wrapNodes = require('./plugins/wrap-nodes');

var treeFactory = function treeFactory(adapter, plugins) {
  var fn = fnFactory(adapter);

  // create wrapped API
  var tree = function tree(value) {
    if (fn.createTree) {
      return fn.createTree(value);
    }

    return fn.createNode(value);
  };

  if (Array.isArray(plugins)) plugins.forEach(function (plugin) {
    return plugin(fn);
  });

  var fnames = Object.keys(fn);

  fnames.forEach(function (fname) {
    var func = fn[fname];
    var def = func.def || {};
    var argTypes = Array.isArray(def.argTypes) ? def.argTypes : [];

    tree[fname] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (argTypes.includes('fn')) {
        return func.apply(undefined, [fn].concat(args));
      }

      return func.apply(undefined, args);
    };
  });

  tree.fn = fn;
  tree.adapter = treeFactory;
  tree.plugin = function (plugin) {
    return plugin(fn);
  };
  tree.plugins = { parentMap: parentMap, serializer: serializer, wrapNodes: wrapNodes };

  return tree;
};

module.exports = treeFactory(defaultAdapter, [parentMap, serializer, wrapNodes]);