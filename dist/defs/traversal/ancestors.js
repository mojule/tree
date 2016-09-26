'use strict';

module.exports = {
  ancestors: function ancestors(fn, root, node) {
    var parentNodes = [];

    var parent = fn.getParent(fn, root, node);

    if (parent) fn.walkUp(fn, root, parent, function (n) {
      parentNodes.push(n);
    });

    return parentNodes;
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: '[node]',
  requires: ['getParent', 'walkUp']
};