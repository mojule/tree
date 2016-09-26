'use strict';

module.exports = {
  walkUp: function walkUp(fn, root, node, callback) {
    var stop = callback(node);

    if (!stop) {
      var parent = fn.getParent(fn, root, node);
      while (parent && !stop) {
        stop = callback(parent);
        if (!stop) parent = fn.getParent(fn, root, parent);
      }
    }
  },
  argTypes: ['fn', 'rootNode', 'node', 'node => boolean'],
  requires: ['getParent'],
  categories: ['traversal']
};