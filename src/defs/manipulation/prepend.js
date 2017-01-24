'use strict'

module.exports = {
  prepend: ( fn, root, parentNode, childNode ) => {
    const children = fn.getChildren( parentNode )

    // if child[ 0 ] is undefined this is the same as append
    return fn.insertBefore( fn, root, parentNode, childNode, children[ 0 ] )
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'node' ],
  returnType: 'node',
  requires: [ 'getChildren', 'insertBefore' ],
  categories: [ 'manipulation' ]
}
