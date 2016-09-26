'use strict';

module.exports = {
  siblings: function siblings(fn, root, node) {
    var parent = fn.getParent(fn, root, node);
    var children = fn.getChildren(parent);

    return children.filter(function (child) {
      return child !== node;
    });
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: '[node]',
  requires: ['getParent', 'getChildren'],
  categories: ['traversal']
};