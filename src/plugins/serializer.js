'use strict'

const serializer = tree => {
  const serialize = node => ({
    value: tree.value( node ),
    children: tree.getChildren( node ).map( serialize )
  })

  const deserialize = obj => {
    const node = tree.createNode( obj.value )

    if( Array.isArray( obj.children ) ){
      obj.children.forEach( child => {
        tree.append( null, node, deserialize( child ) )
      })
    }

    return node
  }

  return { serialize, deserialize }
}

serializer.requirements = [ 'value', 'getChildren', 'createNode', 'append' ]

module.exports = serializer
