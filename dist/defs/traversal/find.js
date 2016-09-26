'use strict';

module.exports = {
  find: function find(fn, node, predicate) {
    var targetNode = void 0;

    fn.walk(fn, node, function (currentNode) {
      if (predicate(currentNode)) {
        targetNode = currentNode;

        return true;
      }
    });

    return targetNode;
  },
  argTypes: ['fn', 'node', 'node => boolean'],
  returnType: 'node',
  requires: ['walk'],
  categories: ['traversal']
};