'use strict'

module.exports = {
  getChildren: node => node.children,
  argTypes: [ 'node' ],
  returnType: '[node]',
  categories: [ 'traversal', 'adapter' ]
}
