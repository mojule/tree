'use strict';

module.exports = {
  contains: function contains(fn, node, predicate) {
    return !!fn.find(fn, node, predicate);
  },
  argTypes: ['fn', 'node', 'node => boolean'],
  returnType: 'boolean',
  requires: ['find'],
  categories: ['traversal']
};