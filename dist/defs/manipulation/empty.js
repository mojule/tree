"use strict";

module.exports = {
  empty: function empty(fn, root, parentNode) {
    var children = fn.getChildren(parentNode).slice();

    return children.reduce(function (removed, node) {
      removed.push(fn.remove(fn, parentNode, node));

      return removed;
    }, []);
  },
  argTypes: ['fn', 'rootNode', 'node'],
  returnType: '[node]',
  requires: ['getChildren', 'remove'],
  categories: ['manipulation']
};