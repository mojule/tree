'use strict'

module.exports = {
  find: ( fn, node, predicate ) => {
    let targetNode

    fn.walk( fn, node, currentNode => {
      if( predicate( currentNode ) ){
        targetNode = currentNode

        return true
      }
    })

    return targetNode
  },
  argTypes: [ 'fn', 'node', 'node => boolean' ],
  returnType: 'node',
  requires: [ 'walk' ],
  categories: [ 'traversal' ]
} 
