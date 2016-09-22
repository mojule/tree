'use strict';

var adapter = require('../adapter-factory');
var decorator = require('../plugin-decorator');
var traversal = require('../plugins/traversal');

var getChildren = function getChildren(node) {
  return node.children;
};

var createNode = function createNode(value) {
  return {
    value: value,
    children: []
  };
};

var value = function value(node, _value) {
  if (_value !== undefined) {
    node.value = _value;
  }

  return node.value;
};

var manipulate = function manipulate(fns) {
  var append = function append(root, parentNode, childNode) {
    if (root) remove(root, childNode);

    parentNode.children.push(childNode);

    return childNode;
  };

  var insertBefore = function insertBefore(root, parentNode, childNode, referenceNode) {
    if (!referenceNode) return append(root, parentNode, childNode);

    if (root) remove(root, childNode);

    var referenceIndex = parentNode.children.indexOf(referenceNode);

    parentNode.children.splice(referenceIndex, 0, childNode);

    return childNode;
  };

  var remove = function remove(root, node) {
    var parentNode = fns.getParent(root, node);

    if (!parentNode) return;

    var index = parentNode.children.indexOf(node);

    parentNode.children.splice(index, 1);

    return node;
  };

  return { append: append, insertBefore: insertBefore, remove: remove };
};

manipulate.requirements = ['getChildren', 'getParent'];

var basePlugins = [traversal, manipulate];

var defaultFns = function defaultFns(plugins) {
  plugins = Array.isArray(plugins) ? basePlugins.concat(plugins) : basePlugins;

  var fns = {
    getChildren: getChildren,
    createNode: createNode,
    value: value
  };

  decorator(fns, plugins);

  return adapter(fns);
};

module.exports = defaultFns;