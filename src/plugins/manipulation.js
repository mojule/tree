'use strict'

const manipulation = tree => {
  const replaceChild = ( root, parentNode, newNode, oldNode ) => {
    tree.insertBefore( root, parentNode, newNode, oldNode )

    return tree.remove( root, oldNode )
  }

  const insertAt = ( root, parentNode, childNode, index ) => {
    const children = tree.getChildren( parentNode )
    const referenceNode = children[ index ]

    return tree.insertBefore( root, parentNode, childNode, referenceNode )
  }

  const insertAfter = ( root, parentNode, childNode, referenceNode ) => {
    const children = tree.getChildren( parentNode )
    const referenceIndex = children.indexOf( referenceNode )
    const beforeNode = children[ referenceIndex + 1 ]

    return tree.insertBefore( root, parentNode, childNode, beforeNode )
  }

  const removeAt = ( root, parentNode, index ) => {
    const children = tree.getChildren( parentNode )
    const childNode = children[ index ]

    return tree.remove( root, childNode )
  }

  const empty = ( root, parentNode ) => {
    const result = []

    const children = tree.getChildren( parentNode ).slice()

    children.forEach( node => result.push( tree.remove( parentNode, node ) ) )

    return result
  }

  const prepend = ( root, parentNode, childNode ) => {
    const children = tree.getChildren( parentNode )

    if( children.length ){
      return tree.insertBefore( root, parentNode, childNode, children[ 0 ] )
    } else {
      return tree.append( root, parentNode, childNode )
    }
  }

  const unwrap = ( root, node ) => {
    const parent = tree.getParent( root, node )
    const grandparent = tree.getParent( root, parent )
    const children = tree.getChildren( parent )

    children.forEach( child => {
      tree.insertBefore( root, grandparent, child, parent )
    })

    return tree.remove( root, parent )
  }

  const wrap = ( root, node, newNode ) => {
    const parent = tree.getParent( root, node )

    tree.insertBefore( root, parent, newNode, node )
    tree.append( root, newNode, node )

    return newNode
  }

  return {
    replaceChild, insertAt, insertAfter, removeAt, empty, prepend, unwrap, wrap
  }
}

manipulation.requirements = [
  'insertBefore', 'append', 'remove', 'getChildren', 'getParent'
]

module.exports = manipulation
