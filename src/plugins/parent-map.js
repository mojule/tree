'use strict'

const parentMap = tree => {
  const parents = new Map()

  const original = {
    append: tree.append,
    insertBefore: tree.insertBefore,
    remove: tree.remove,
    getParent: tree.getParent
  }

  const append = ( root, parentNode, childNode ) => {
    const value = original.append( root, parentNode, childNode )

    parents.set( childNode, parentNode )

    return value
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

  return { append, insertBefore, remove, getParent }
}

parentMap.requirements = [ 'append', 'insertBefore', 'remove' ]

module.exports = parentMap
