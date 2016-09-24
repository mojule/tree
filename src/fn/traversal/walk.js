'use strict'

module.exports = {
  walk: ( fn, node, callback ) => {
    let current, parent, depth, i, children, stop
    let nodes = [ node ]
    let parents = [ null ]
    let depths = [ 0 ]

    while( nodes.length ){
      current = nodes.pop()
      parent = parents.pop()
      depth = depths.pop()

      stop = callback( current, parent, depth )

      if( stop ) break

      children = fn.getChildren( current )

      for( i = children.length - 1; i >= 0; i-- ){
        nodes.push( children[ i ] )
        parents.push( current )
        depths.push( depth + 1 )
      }
    }
  },
  argTypes: [ 'fn', 'node', '( node, node, integer ) => boolean' ],
  requires: [ 'getChildren' ],
  categories: [ 'traversal' ]
} 
