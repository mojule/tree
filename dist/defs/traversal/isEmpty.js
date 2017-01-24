'use strict';

module.exports = {
  isEmpty: function isEmpty(fn, node) {
    return false;
  }, //eslint-disable-line no-unused-vars
  argTypes: ['fn', 'node'],
  returnType: 'boolean',
  requires: [],
  categories: ['traversal']
};