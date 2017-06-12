'use strict'

const deserialize = api => {
  api.deserialize = ( serialized, mapper = value => value ) => {
    const value = mapper( serialized[ 0 ] )
    const node = api.create( value )
    const { length } = serialized

    for( let i = 1; i < length; i++ )
      node.appendChild( api.deserialize( serialized[ i ], mapper ) )

    return node
  }
}

module.exports = deserialize
