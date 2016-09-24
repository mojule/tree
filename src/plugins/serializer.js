'use strict'

const serializer = fn => {
  const serialize = node => ({
    value: fn.value( node ),
    children: fn.getChildren( node ).map( serialize )
  })

  const deserialize = obj => {
    const node = fn.createNode( obj.value )

    if( Array.isArray( obj.children ) ){
      obj.children.forEach( child => {
        fn.append( null, node, deserialize( child ) )
      })
    }

    return node
  }

  return { serialize, deserialize }
}

module.exports = serializer
