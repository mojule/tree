'use strict';

module.exports = {
  childAt: function childAt(fn, node, i) {
    return fn.getChildren(node)[i];
  },
  argTypes: ['fn', 'node', 'integer'],
  returnType: 'node',
  requires: ['getChildren'],
  categories: ['traversal']
};