'use strict'

module.exports = {
  hasChildren: ( fn, node ) => fn.getChildren( node ).length > 0,
  argTypes: [ 'fn', 'node' ],
  returnType: 'boolean',
  requires: [ 'getChildren' ],
  categories: [ 'traversal' ]
}
