'use strict';

module.exports = {
  firstChild: function firstChild(fn, node) {
    return fn.getChildren(node)[0];
  },
  argTypes: ['fn', 'node'],
  returnType: 'node',
  requires: ['getChildren'],
  categories: ['traversal']
};