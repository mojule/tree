 'use strict'

module.exports = {
  isEmpty: ( fn, node ) => false,
  argTypes: [ 'fn', 'node' ],
  returnType: 'boolean',
  requires: [],
  categories: [ 'traversal' ]
}
