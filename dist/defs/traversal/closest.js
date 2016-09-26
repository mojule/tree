'use strict';

module.exports = {
  closest: function closest(fn, root, node, predicate) {
    var targetNode = void 0;

    fn.walkUp(fn, root, node, function (currentNode) {
      if (predicate(currentNode)) {
        targetNode = currentNode;

        return true;
      }
    });

    return targetNode;
  },
  argTypes: ['fn', 'rootNode', 'node', 'node => boolean'],
  returnType: 'node',
  requires: ['walkUp'],
  categories: ['traversal']
};