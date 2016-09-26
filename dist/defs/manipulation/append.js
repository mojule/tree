'use strict';

module.exports = {
  append: function append(fn, root, parentNode, childNode) {
    return fn.insertBefore(fn, root, parentNode, childNode);
  },
  argTypes: ['fn', 'rootNode', 'node', 'node'],
  returnType: 'node',
  requires: ['insertBefore'],
  categories: ['manipulation']
};