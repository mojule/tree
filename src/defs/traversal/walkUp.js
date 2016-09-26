'use strict'

module.exports = {
  walkUp: ( fn, root, node, callback ) => {
    let stop = callback( node )

    if( !stop ){
      let parent = fn.getParent( fn, root, node )
      while( parent && !stop ){
        stop = callback( parent )
        if( !stop ) parent = fn.getParent( fn, root, parent )
      }
    }
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'node => boolean' ],
  requires: [ 'getParent' ],
  categories: [ 'traversal' ]
} 

