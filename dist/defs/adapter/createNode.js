'use strict';

module.exports = {
  createNode: function createNode() {
    throw new Error('Adapter does not implement createNode');
  },
  argTypes: ['nodeValue'],
  returnType: 'node',
  categories: ['manipulation', 'adapter']
};