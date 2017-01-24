'use strict'

module.exports = {
  closest: ( fn, root, node, predicate ) => {
    let targetNode

    fn.walkUp( fn, root, node, currentNode => {
      if( predicate( currentNode ) ) {
        targetNode = currentNode

        return true
      }
    })

    return targetNode
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'node => boolean' ],
  returnType: 'node',
  requires: [ 'walkUp' ],
  categories: [ 'traversal' ]
}
