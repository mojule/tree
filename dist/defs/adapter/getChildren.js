'use strict';

module.exports = {
  getChildren: function getChildren() {
    throw new Error('Adapter does not implement getChildren');
  },
  argTypes: ['node'],
  returnType: '[node]',
  categories: ['traversal', 'adapter']
};