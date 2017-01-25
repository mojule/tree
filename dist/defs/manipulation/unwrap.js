'use strict';

module.exports = {
  unwrap: function unwrap(fn, root, node) {
    var parent = fn.getParent(fn, root, node);
    var grandparent = fn.getParent(fn, root, parent);
    var children = fn.getChildren(parent);

    children.forEach(function (child) {
      return fn.insertBefore(fn, root, grandparent, child, parent);
    });

    return fn.remove(fn, root, parent);
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: 'node',
  requires: ['getParent', 'getChildren', 'insertBefore', 'remove'],
  categories: ['manipulation']
};