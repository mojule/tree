'use strict'

module.exports = {
  nextSibling: ( fn, root, node ) => {
    const parent = fn.getParent( fn, root, node )
    const children = fn.getChildren( parent )

    const index = children.indexOf( node )

    return children[ index + 1 ]
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'node',
  requires: [ 'getParent', 'getChildren' ],
  categories: [ 'traversal' ]
}
