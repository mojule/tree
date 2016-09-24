'use strict'

module.exports = {
  descendents: ( fn, node ) => fn.findAll( fn, node, n => n !== node ),
  argTypes: [ 'fn', 'node' ],
  returnType: '[node]',
  requires: [ 'findAll' ],
  categories: [ 'traversal' ]
}
