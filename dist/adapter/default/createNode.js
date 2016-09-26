'use strict';

module.exports = {
  createNode: function createNode(value) {
    return {
      value: value,
      children: []
    };
  },
  argTypes: ['nodeValue'],
  returnType: 'node',
  categories: ['manipulation', 'adapter']
};