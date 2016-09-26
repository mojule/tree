'use strict';

module.exports = {
  insertBefore: function insertBefore(fn, root, parentNode, childNode, referenceNode) {
    if (root) fn.remove(fn, root, childNode);

    if (referenceNode) {
      var referenceIndex = parentNode.children.indexOf(referenceNode);

      parentNode.children.splice(referenceIndex, 0, childNode);
    } else {
      parentNode.children.push(childNode);
    }

    return childNode;
  },
  argTypes: ['fn', 'rootNode', 'node', 'node', 'node'],
  returnType: 'node',
  requires: ['remove'],
  categories: ['manipulation', 'adapter']
};