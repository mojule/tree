'use strict'

module.exports = {
  remove: ( fn, root, node ) => {
    const parentNode = fn.getParent( fn, root, node )

    if( !parentNode ) return

    const index = parentNode.children.indexOf( node )

    parentNode.children.splice( index, 1 )

    return node
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'node',
  requires: [ 'getParent' ],
  categories: [ 'manipulation', 'adapter' ]
}
