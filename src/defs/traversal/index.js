'use strict'

module.exports = {
  index: ( fn, root, node ) => {
    if( root === node ) return 0

    const parent = fn.getParent( fn, root, node )
    const children = fn.getChildren( parent )

    return children.indexOf( node )
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'integer',
  requires: [ 'getParent', 'getChildren' ],
  categories: [ 'traversal' ]
}
