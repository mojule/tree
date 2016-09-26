'use strict';

module.exports = {
  descendents: function descendents(fn, node) {
    return fn.findAll(fn, node, function (n) {
      return n !== node;
    });
  },
  argTypes: ['fn', 'node'],
  returnType: '[node]',
  requires: ['findAll'],
  categories: ['traversal']
};