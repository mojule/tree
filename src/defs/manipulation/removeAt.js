"use strict"

module.exports = {
  removeAt: ( fn, root, parentNode, index ) => {
    const children = fn.getChildren( parentNode )
    const childNode = children[ index ]

    return fn.remove( fn, root, childNode )
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'integer' ],
  returnType: 'node',
  requires: [ 'getChildren', 'remove' ],
  categories: [ 'manipulation' ]
}
