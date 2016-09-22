'use strict';

var decorator = require('./plugin-decorator');

var traversal = require('./plugins/traversal');
var serializer = require('./plugins/serializer');
var manipulation = require('./plugins/manipulation');
var parentMap = require('./plugins/parent-map');
var api = require('./plugins/api');

var basePlugins = [traversal, manipulation, serializer];
var postPlugins = [parentMap, api];

var factory = function factory(adapter) {
  var tree = Object.assign({}, adapter);

  decorator(tree, basePlugins);

  // adapter always overrides the base plugins
  Object.assign(tree, adapter);

  // post-plugins may wrap/tap others, so need to be last
  decorator(tree, postPlugins);

  return tree;
};

module.exports = factory;