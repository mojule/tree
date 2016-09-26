'use strict'

module.exports = {
  remove: () => {
    throw new Error( 'Adapter does not implement remove' )
  },
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'node',
  requires: [ 'getParent' ],
  categories: [ 'manipulation', 'adapter' ]
}
