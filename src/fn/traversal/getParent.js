'use strict'

module.exports = {
  getParent: ( fn, root, node ) =>
    fn.find( fn, root, currentNode =>
      fn.getChildren( currentNode ).includes( node )
    ),
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'node',
  requires: [ 'find', 'getChildren' ],
  categories: [ 'traversal' ]
} 
