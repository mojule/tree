'use strict';

module.exports = {
  insertBefore: function insertBefore() {
    throw new Error('Adapter does not implement insertBefore');
  },
  argTypes: ['fn', 'rootNode', 'node', 'node', 'node'],
  returnType: 'node',
  requires: ['remove'],
  categories: ['manipulation', 'adapter']
};