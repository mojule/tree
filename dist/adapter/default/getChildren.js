'use strict';

module.exports = {
  getChildren: function getChildren(node) {
    return node.children;
  },
  argTypes: ['node'],
  returnType: '[node]',
  categories: ['traversal', 'adapter']
};