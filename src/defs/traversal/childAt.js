'use strict'

module.exports = {
  childAt: ( fn, node, i ) => fn.getChildren( node )[ i ],
  argTypes: [ 'fn', 'node', 'integer' ],
  returnType: 'node',
  requires: [ 'getChildren' ],
  categories: [ 'traversal' ]
}
