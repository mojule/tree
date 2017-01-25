'use strict';

require('./polyfills');

var defaultAdapter = require('./adapter/default');
var fnFactory = require('./fn-factory');

var meta = require('./plugins/meta');
var parentMap = require('./plugins/parent-map');
var serializer = require('./plugins/serializer');
var wrapNodes = require('./plugins/wrap-nodes');
var accepts = require('./plugins/accepts');
var nodeType = require('./plugins/nodeType');
var id = require('./plugins/id');

var pluginMap = { parentMap: parentMap, accepts: accepts, nodeType: nodeType, id: id, serializer: serializer, meta: meta, wrapNodes: wrapNodes };
var pluginArray = Object.keys(pluginMap).map(function (key) {
  return pluginMap[key];
});

var treeFactory = function treeFactory(adapter, plugins) {
  var fn = fnFactory(adapter);

  if (Array.isArray(plugins)) plugins.forEach(function (plugin) {
    return plugin(fn);
  });

  // create wrapped API
  var Tree = function Tree(root) {
    return fn.createTree(root);
  };

  var fnames = Object.keys(fn);

  fnames.forEach(function (fname) {
    var func = fn[fname];
    var def = func.def || {};
    var argTypes = Array.isArray(def.argTypes) ? def.argTypes : [];

    Tree[fname] = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (argTypes.includes('fn')) {
        return func.apply(undefined, [fn].concat(args));
      }

      return func.apply(undefined, args);
    };
  });

  Tree.createRoot = function (value) {
    return Tree(Tree.createNode(value));
  };
  Tree.fn = fn;
  Tree.adapter = treeFactory;
  Tree.plugin = function (plugin) {
    return plugin(fn);
  };
  Tree.plugins = pluginMap;

  return Tree;
};

module.exports = treeFactory(defaultAdapter, pluginArray);