'use strict'

module.exports = {
  value: ( node, value ) => {
    if( value !== undefined ){
      node.value = value
    }

    return node.value
  },
  argTypes: [ 'node', 'nodeValue?' ],
  returnType: 'nodeValue',
  categories: [ 'manipulation', 'adapter' ]
}
