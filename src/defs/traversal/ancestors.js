'use strict'

module.exports = {
  ancestors: ( fn, root, node ) => {
    const parentNodes = []

    const parent = fn.getParent( fn, root, node )

    if( parent ) fn.walkUp( fn, root, parent, n => {
      parentNodes.push( n )
    })

    return parentNodes
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: '[node]',
  requires: [ 'getParent', 'walkUp' ]
}
