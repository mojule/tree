'use strict'

const parentMap = fn => {
  const parents = new Map()

  const original = {
    insertBefore: fn.insertBefore,
    remove: fn.remove,
    getParent: fn.getParent
  }

  const insertBefore = ( fn, root, parentNode, childNode, referenceNode ) => {
    const value = original.insertBefore( fn, root, parentNode, childNode, referenceNode )

    parents.set( childNode, parentNode )

    return value
  }

  const remove = ( fn, root, node ) => {
    const value = original.remove( fn, root, node )

    parents.set( node, null )

    return value
  }

  const getParent = ( fn, root, node ) => {
    let parent = parents.get( node )

    if( !parent && original.getParent ){
      parent = original.getParent( fn, root, node )
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

    wrapped[ fname ].def.categories.push( 'parentMap', 'plugin' )
  })

  return Object.assign( fn, wrapped )
}

module.exports = parentMap
