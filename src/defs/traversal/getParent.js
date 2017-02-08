'use strict'

/*
  This is horrifically inefficient, however, given that a root is present this
  will *always* work. The performance issue is mitigated by the parent-map
  plugin, which wraps getParent, insertBefore etc.
*/

module.exports = {
  getParent: ( fn, root, node ) =>
    fn.find( fn, root, currentNode =>
      fn.getChildren( currentNode ).includes( node )
    ),
  argTypes: [ 'fn', 'rootNode', 'node' ],
  returnType: 'node',
  requires: [ 'find', 'getChildren' ],
  categories: [ 'traversal' ]
}
