'use strict';

module.exports = {
  getParent: function getParent(fn, root, node) {
    return fn.find(fn, root, function (currentNode) {
      return fn.getChildren(currentNode).includes(node);
    });
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: 'node',
  requires: ['find', 'getChildren'],
  categories: ['traversal']
};