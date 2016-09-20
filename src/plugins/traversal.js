'use strict'

const traversal = tree => {
  const walk = ( node, callback ) => {
    let current, parent, depth, i, children, stop
    let nodes = [ node ]
    let parents = [ null ]
    let depths = [ 0 ]

    while( nodes.length ){
      current = nodes.pop()
      parent = parents.pop()
      depth = depths.pop()

      stop = callback( current, parent, depth )

      if( stop ) break

      children = tree.getChildren( current )

      for( i = children.length - 1; i >= 0; i-- ){
        nodes.push( children[ i ] )
        parents.push( current )
        depths.push( depth + 1 )
      }
    }
  }

  const walkUp = ( root, node, callback ) => {
    let stop = callback( node )

    if( !stop ){
      let parent = tree.getParent( root, node )
      while( parent && !stop ){
        stop = callback( parent )
        if( !stop ) parent = tree.getParent( root, parent )
      }
    }
  }

  const find = ( node, predicate ) => {
    let targetNode

    walk( node, currentNode => {
      if( predicate( currentNode ) ){
        targetNode = currentNode

        return true
      }
    })

    return targetNode
  }

  const getParent = ( root, node ) =>
    find( root, currentNode =>
      tree.getChildren( currentNode ).includes( node )
    )

  const childAt = ( node, i ) => tree.getChildren( node )[ i ]

  const firstChild = node => tree.getChildren( node )[ 0 ]

  const lastChild = node => {
    const children = tree.getChildren( node )

    return children[ children.length - 1 ]
  }

  const nextSibling = ( root, node ) => {
    const parent = tree.getParent( root, node )
    const children = tree.getChildren( parent )

    const index = children.indexOf( node )

    return children[ index + 1 ]
  }

  const previousSibling = ( root, node ) => {
    const parent = tree.getParent( root, node )
    const children = tree.getChildren( parent )

    const index = children.indexOf( node )

    return children[ index - 1 ]
  }

  const closest = ( root, node, predicate ) => {
    let targetNode

    walkUp( root, node, currentNode => {
      if( predicate( currentNode ) ){
        targetNode = currentNode

        return true
      }
    })

    return targetNode
  }

  const ancestors = ( root, node ) => {
    const parentNodes = []

    let parent = tree.getParent( root, node )

    if( parent ) walkUp( root, parent, n => {
      parentNodes.push( n )
    })

    return parentNodes
  }

  const siblings = ( root, node ) => {
    const parent = tree.getParent( root, node )
    const children = tree.getChildren( parent )

    return children.filter( child => child !== node )
  }

  const findAll = ( node, predicate ) => {
    const nodes = []

    tree.walk( node, currentNode => {
      if( predicate( currentNode ) ){
        nodes.push( currentNode )
      }
    })

    return nodes
  }

  const descendents = node => findAll( node, n => n !== node )

  const contains = ( node, predicate ) => !!find( node, predicate )

  const hasChildren = node => tree.getChildren( node ).length > 0

  return {
    walk, find, getParent, childAt, firstChild, lastChild, nextSibling,
    previousSibling, closest, ancestors, siblings, descendents, findAll,
    contains, hasChildren
  }
}

traversal.requirements = [ 'getChildren' ]

module.exports = traversal
