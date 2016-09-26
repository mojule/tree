"use strict"

module.exports = {
  insertAfter: ( fn, root, parentNode, childNode, referenceNode ) => {
    const children = fn.getChildren( parentNode )
    const referenceIndex = children.indexOf( referenceNode )
    const beforeNode = children[ referenceIndex + 1 ]

    return fn.insertBefore( fn, root, parentNode, childNode, beforeNode )
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'node', 'node' ],
  returnType: 'node',
  requires: [ 'getChildren', 'insertBefore' ],
  categories: [ 'manipulation' ]
}
