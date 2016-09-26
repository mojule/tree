'use strict'

const serializer = fn => {
  const serialize = node => ({
    value: fn.value( node ),
    children: fn.getChildren( node ).map( serialize )
  })

  serialize.def = {
    argTypes: [ 'node' ],
    returnType: 'object',
    requires: [ 'value', 'getChildren' ],
    categories: [ 'serializer', 'plugin' ]
  }

  const deserialize = obj => {
    const parentNode = fn.createNode( obj.value )

    if( Array.isArray( obj.children ) ){
      obj.children.forEach( child => {
        fn.append( fn, null, parentNode, deserialize( child ) )
      })
    }

    return parentNode
  }

  deserialize.def = {
    argTypes: [ 'object' ],
    returnType: 'node',
    requires: [ 'createNode', 'append' ],
    categories: [ 'serializer', 'plugin' ]
  }

  return Object.assign( fn, { serialize, deserialize } )
}

module.exports = serializer
