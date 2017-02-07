'use strict'

module.exports = {
  slug: ( fn, root, node ) => {
    return root === node ? '' : String( fn.index( fn, root, node ) )
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'string',
  requires: [ 'index' ],
  categories: [ 'traversal' ]
}
