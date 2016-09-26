'use strict'

require( './polyfills' )

const defaultAdapter = require( './adapter/default' )
const fnFactory = require( './fn-factory' )

const parentMap = require( './plugins/parent-map' )
const serializer = require( './plugins/serializer' )
const wrapNodes = require( './plugins/wrap-nodes' )

const treeFactory = ( adapter, plugins ) => {
  const fn = fnFactory( adapter )

  // create wrapped API
  const tree = value => {
    if( fn.createTree ){
      return fn.createTree( value )
    }

    return fn.createNode( value )
  }

  if( Array.isArray( plugins ) )
    plugins.forEach( plugin => plugin( fn ) )

  const fnames = Object.keys( fn )

  fnames.forEach( fname => {
    const func = fn[ fname ]
    const def = func.def || {}
    const argTypes = Array.isArray( def.argTypes ) ? def.argTypes : []

    tree[ fname ] = ( ...args ) => {
      if( argTypes.includes( 'fn' ) ){
        return func( fn, ...args )
      }

      return func( ...args )
    }
  })

  tree.fn = fn
  tree.adapter = treeFactory
  tree.plugin = plugin => plugin( fn )
  tree.plugins = { parentMap, serializer, wrapNodes }

  return tree
}

module.exports = treeFactory( defaultAdapter, [ parentMap, serializer, wrapNodes ] )
