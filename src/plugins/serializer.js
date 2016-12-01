'use strict'

const cloneObj = obj => JSON.parse( JSON.stringify( obj ) )

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

  const clone = ( fn, node ) =>
    fn.deserialize( cloneObj( fn.serialize( node ) ) )

  clone.def = {
    argTypes: [ 'fn', 'node' ],
    returnType: 'node',
    requires: [ 'serialize', 'deserialize' ],
    categories: [ 'clone', 'plugin' ]
  }

  return Object.assign( fn, { serialize, deserialize, clone } )
}

module.exports = serializer
