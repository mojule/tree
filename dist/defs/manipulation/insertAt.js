'use strict';

module.exports = {
  insertAt: function insertAt(fn, root, parentNode, childNode, index) {
    var children = fn.getChildren(parentNode);
    var referenceNode = children[index];

    return fn.insertBefore(fn, root, parentNode, childNode, referenceNode);
  },
  argTypes: ['fn', 'rootNode', 'node', 'node', 'integer'],
  returnType: 'node',
  requires: ['getChildren', 'insertBefore'],
  categories: ['manipulation']
};