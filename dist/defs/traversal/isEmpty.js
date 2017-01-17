'use strict';

module.exports = {
  isEmpty: function isEmpty(fn, node) {
    return false;
  },
  argTypes: ['fn', 'node'],
  returnType: 'boolean',
  requires: [],
  categories: ['traversal']
};