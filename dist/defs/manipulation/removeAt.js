"use strict";

module.exports = {
  removeAt: function removeAt(fn, root, parentNode, index) {
    var children = fn.getChildren(parentNode);
    var childNode = children[index];

    return fn.remove(fn, root, childNode);
  },
  argTypes: ['fn', 'rootNode', 'node', 'integer'],
  returnType: 'node',
  requires: ['getChildren', 'remove'],
  categories: ['manipulation']
};