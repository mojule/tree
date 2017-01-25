'use strict';

module.exports = {
  insertAfter: function insertAfter(fn, root, parentNode, childNode, referenceNode) {
    var children = fn.getChildren(parentNode);
    var referenceIndex = children.indexOf(referenceNode);
    var beforeNode = children[referenceIndex + 1];

    return fn.insertBefore(fn, root, parentNode, childNode, beforeNode);
  },
  argTypes: ['fn', 'rootNode', 'node', 'node', 'node'],
  returnType: 'node',
  requires: ['getChildren', 'insertBefore'],
  categories: ['manipulation']
};