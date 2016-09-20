'use strict'

const tree = require( '../../index' )
const adapter = tree.adapter
const decorator = tree.plugin

const createNodeMapper = document => {
  const nodeMapper = {
    // element
    1: value => document.createElement( value.tagName ),

    // text
    3: value => document.createTextNode( value.nodeValue ),

    // comment
    8: value => document.createComment( value.nodeValue ),

    // document
    9: value => {
      const title = value.title || ''
      const root = document.implementation.createHTMLDocument( title )

      if( !value.isPrepopulated ){
        //remove default children
        while( root.firstChild ){
          root.firstChild.remove()
        }
      }

      return root
    },

    // doctype
    10: value => document.implementation.createDocumentType( value.qualifiedNameStr, value.publicId, value.systemId ),

    // fragment
    11: () => document.createDocumentFragment()
  }

  const createNode = value => nodeMapper[ value.nodeType ]( value )

  return createNode
}

const valueMapper = {
  get: {
    // element
    1: node => ({
      nodeType: node.nodeType,
      tagName: node.tagName,
      attributes: Array.from( node.attributes ).map( attr => ({
        name: attr.name,
        value: attr.value
      }))
    }),

    // text
    3: node => ({
      nodeType: node.nodeType,
      nodeValue: node.nodeValue
    }),

    // comment
    8: node => ({
      nodeType: node.nodeType,
      nodeValue: node.nodeValue
    }),

    // document
    9: node => ({
      nodeType: node.nodeType
    }),

    // doctype
    10: node => ({
      nodeType: node.nodeType,
      qualifiedNameStr: node.qualifiedNameStr,
      publicId: node.publicId,
      systemId: node.systemId
    }),

    // fragment
    11: node => ({
      nodeType: node.nodeType
    })
  },
  set: {
    // element
    1: ( node, value ) => value.attributes.forEach( pair => {
      node.setAttribute( pair.name, pair.value )
    }),

    // text
    3: ( node, value ) => node.nodeValue = value.nodeValue,

    // comment
    8: ( node, value ) => node.nodeValue = value.nodeValue,

    // document
    9: node => {},

    // doctype
    10: ( node, value ) => {
      node.qualifiedNameStr = value.qualifiedNameStr
      node.publicId = value.publicId
      node.systemId = value.systemId
    },

    // fragment - has no values to set
    11: () => {}
  }
}

const value = ( node, value ) => {
  if( value !== undefined ){
    valueMapper.set[ node.nodeType ]( node, value )
  }

  return valueMapper.get[ node.nodeType ]( node )
}

const domAdapter = ( document, plugins ) => {
  plugins = Array.isArray( plugins ) ? plugins : []

  // createNode should allow no arg to be passed and default to doing something
  // sensible, in this case creating an empty document node
  const createNode = value => createNodeMapper( document )( value || { nodeType: 9 } )

  const getChildren = node => Array.from( node.childNodes )

  const getParent = node => node.parentNode

  const append = ( root, parentNode, childNode ) => parentNode.appendChild( childNode )

  const insertBefore = ( root, parentNode, childNode, referenceNode ) =>
    parentNode.insertBefore( childNode, referenceNode )

  const remove = ( root, node ) => node.remove()

  const fns = adapter({
    getChildren,
    getParent,
    createNode,
    value,
    append,
    insertBefore,
    remove
  })

  decorator( fns, plugins )

  return fns
}

module.exports = domAdapter
