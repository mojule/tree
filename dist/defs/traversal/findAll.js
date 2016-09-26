'use strict';

module.exports = {
  findAll: function findAll(fn, node, predicate) {
    var nodes = [];

    fn.walk(fn, node, function (currentNode) {
      if (predicate(currentNode)) {
        nodes.push(currentNode);
      }
    });

    return nodes;
  },
  argTypes: ['fn', 'node', 'node => boolean'],
  returnType: '[node]',
  requires: ['walk'],
  categories: ['traversal']
};