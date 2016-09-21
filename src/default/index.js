'use strict'

const adapter = require( '../adapter-factory' )
const decorator = require( '../plugin-decorator' )
const traversal = require( '../plugins/traversal' )

const getChildren = node => node.children

const createNode = value => ({
  value,
  children: []
})

const value = ( node, value ) => {
  if( value !== undefined ){
    node.value = value
  }

  return node.value
}

const manipulate = fns => {
  const append = ( root, parentNode, childNode ) => {
    if( root ) remove( root, childNode )

    parentNode.children.push( childNode )

    return childNode
  }

  const insertBefore = ( root, parentNode, childNode, referenceNode ) => {
    if( !referenceNode )
      return append( root, parentNode, childNode )

    if( root ) remove( root, childNode )

    const referenceIndex = parentNode.children.indexOf( referenceNode )

    parentNode.children.splice( referenceIndex, 0, childNode )

    return childNode
  }

  const remove = ( root, node ) => {
    const parentNode = fns.getParent( root, node )

    if( !parentNode ) return

    const index = parentNode.children.indexOf( node )

    parentNode.children.splice( index, 1 )

    return node
  }

  return { append, insertBefore, remove }
}

manipulate.requirements = [ 'getChildren', 'getParent' ]

const basePlugins = [ traversal, manipulate ]

const defaultFns = plugins => {
  plugins = Array.isArray( plugins ) ? basePlugins.concat( plugins ) : basePlugins

  const fns = {
    getChildren,
    createNode,
    value
  }

  decorator( fns, plugins )

  return adapter( fns )
}

module.exports = defaultFns
