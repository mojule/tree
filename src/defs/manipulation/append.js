'use strict'

module.exports = {
  append: ( fn, root, parentNode, childNode ) => 
    fn.insertBefore( fn, root, parentNode, childNode ),
  argTypes: [ 'fn', 'rootNode', 'node', 'node' ],
  returnType: 'node',
  requires: [ 'insertBefore' ],
  categories: [ 'manipulation' ]
} 
