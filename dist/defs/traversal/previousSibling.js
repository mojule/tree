'use strict';

module.exports = {
  previousSibling: function previousSibling(fn, root, node) {
    var parent = fn.getParent(fn, root, node);
    var children = fn.getChildren(parent);

    var index = children.indexOf(node);

    return children[index - 1];
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: 'node',
  requires: ['getParent', 'getChildren'],
  categories: ['traversal']
};