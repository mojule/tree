'use strict'

module.exports = {
  contains: ( fn, node, predicate ) => !!fn.find( fn, node, predicate ),
  argTypes: [ 'fn', 'node', 'node => boolean' ],
  returnType: 'boolean',
  requires: [ 'find' ],
  categories: [ 'traversal' ]
}
