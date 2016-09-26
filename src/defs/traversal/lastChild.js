'use strict'

module.exports = {
  lastChild: ( fn, node ) => {
    const children = fn.getChildren( node )

    return children[ children.length - 1 ]
  },
  argTypes: [ 'fn', 'node' ],
  returnType: 'node',
  requires: [ 'getChildren' ],
  categories: [ 'traversal' ]
}
