'use strict';

module.exports = {
  lastChild: function lastChild(fn, node) {
    var children = fn.getChildren(node);

    return children[children.length - 1];
  },
  argTypes: ['fn', 'node'],
  returnType: 'node',
  requires: ['getChildren'],
  categories: ['traversal']
};