'use strict'

const parentMap = fn => {
  const parents = new Map()

  const original = {
    insertBefore: fn.insertBefore,
    remove: fn.remove,
    getParent: fn.getParent
  }

  const insertBefore = ( root, parentNode, childNode, referenceNode ) => {
    const value = original.insertBefore( root, parentNode, childNode, referenceNode )

    parents.set( childNode, parentNode )

    return value
  }

  const remove = ( root, node ) => {
    const value = original.remove( root, node )

    parents.set( node, null )

    return value
  }

  const getParent = ( root, node ) => {
    let parent = parents.get( node )

    if( !parent && original.getParent ){
      parent = original.getParent( root, node )
      parents.set( node, parent )
    }

    return parent
  }

  const wrapped = { insertBefore, remove, getParent }

  Object.keys( wrapped ).forEach( fname => {
    wrapped[ fname ].def = Object.assign( 
      { 
        wraps: original[ fname ] 
      }, 
      original[ fname ].def 
    )
  })

  return Object.assign( {}, fn, wrapped )
}

module.exports = parentMap
