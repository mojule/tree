"use strict"

module.exports = {
  empty: ( fn, root, parentNode ) => {
    const children = fn.getChildren( parentNode ).slice()

    return children.reduce( ( removed, node ) => {
      removed.push( fn.remove( fn, parentNode, node ) )
      
      return removed
    }, [] ) 
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: '[node]',
  requires: [ 'getChildren', 'remove' ],
  categories: [ 'manipulation' ]
}
