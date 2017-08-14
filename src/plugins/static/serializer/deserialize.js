'use strict'

const deserialize = ({ statics, Api }) => {
  statics.deserialize = ( serialized, mapper = value => value ) => {
    const value = mapper( serialized[ 0 ] )
    const node = Api( value )
    const { length } = serialized

    for( let i = 1; i < length; i++ )
      node.appendChild( statics.deserialize( serialized[ i ], mapper ) )

    return node
  }
}

module.exports = deserialize
