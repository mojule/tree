'use strict'

module.exports = {
  siblings: ( fn, root, node ) => {
    const parent = fn.getParent( fn, root, node )
    const children = fn.getChildren( parent )

    return children.filter( child => child !== node )
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: '[node]',
  requires: [ 'getParent', 'getChildren' ],
  categories: [ 'traversal' ]
}
