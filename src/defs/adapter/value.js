'use strict'

module.exports = {
  value: () => {
    throw new Error( 'Adapter does not implement value' )
  },
  argTypes: [ 'node', 'nodeValue?' ],
  returnType: 'nodeValue',
  categories: [ 'manipulation', 'adapter' ]
}
