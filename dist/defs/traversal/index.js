'use strict';

module.exports = {
  index: function index(fn, root, node) {
    if (root === node) return 0;

    var parent = fn.getParent(fn, root, node);
    var children = fn.getChildren(parent);

    return children.indexOf(node);
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: 'integer',
  requires: ['getParent', 'getChildren'],
  categories: ['traversal']
};