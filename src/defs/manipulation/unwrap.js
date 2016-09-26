"use strict"

module.exports = {
  unwrap: ( fn, root, node ) => {
    const parent = fn.getParent( fn, root, node )
    const grandparent = fn.getParent( fn, root, parent )
    const children = fn.getChildren( parent )

    children.forEach( child =>
      fn.insertBefore( fn, root, grandparent, child, parent )
    )

    return fn.remove( fn, root, parent )
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'node',
  requires: [ 'getParent', 'getChildren', 'insertBefore', 'remove' ],
  categories: [ 'manipulation' ]
}
