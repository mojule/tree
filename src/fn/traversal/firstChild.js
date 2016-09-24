'use strict'

module.exports = {
  firstChild: ( fn, node ) => fn.getChildren( node )[ 0 ],
  argTypes: [ 'fn', 'node' ],
  returnType: 'node',
  requires: [ 'getChildren' ],
  categories: [ 'traversal' ]
}
