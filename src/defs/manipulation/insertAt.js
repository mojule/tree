"use strict"

module.exports = {
  insertAt: ( fn, root, parentNode, childNode, index ) => {
    const children = fn.getChildren( parentNode )
    const referenceNode = children[ index ]

    return fn.insertBefore( fn, root, parentNode, childNode, referenceNode )
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'node', 'integer' ],
  returnType: 'node',
  requires: [ 'getChildren', 'insertBefore' ],
  categories: [ 'manipulation' ]
}
