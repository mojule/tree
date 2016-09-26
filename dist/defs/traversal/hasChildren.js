'use strict';

module.exports = {
  hasChildren: function hasChildren(fn, node) {
    return fn.getChildren(node).length > 0;
  },
  argTypes: ['fn', 'node'],
  returnType: 'boolean',
  requires: ['getChildren'],
  categories: ['traversal']
};