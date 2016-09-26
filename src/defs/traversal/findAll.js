'use strict'

module.exports = {
  findAll: ( fn, node, predicate ) => {
    const nodes = []

    fn.walk( fn, node, currentNode => {
      if( predicate( currentNode ) ){
        nodes.push( currentNode )
      }
    })

    return nodes
  },
  argTypes: [ 'fn', 'node', 'node => boolean' ],
  returnType: '[node]',
  requires: [ 'walk' ],
  categories: [ 'traversal' ]
}
