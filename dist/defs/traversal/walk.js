'use strict';

module.exports = {
  walk: function walk(fn, node, callback) {
    var current = void 0,
        parent = void 0,
        depth = void 0,
        i = void 0,
        children = void 0,
        stop = void 0;
    var nodes = [node];
    var parents = [null];
    var depths = [0];

    while (nodes.length) {
      current = nodes.pop();
      parent = parents.pop();
      depth = depths.pop();

      stop = callback(current, parent, depth);

      if (stop) break;

      children = fn.getChildren(current);

      for (i = children.length - 1; i >= 0; i--) {
        nodes.push(children[i]);
        parents.push(current);
        depths.push(depth + 1);
      }
    }
  },
  argTypes: ['fn', 'node', '( node, node, integer ) => boolean'],
  requires: ['getChildren'],
  categories: ['traversal']
};