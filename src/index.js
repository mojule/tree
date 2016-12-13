'use strict'

require( './polyfills' )

const defaultAdapter = require( './adapter/default' )
const fnFactory = require( './fn-factory' )

const meta = require( './plugins/meta' )
const parentMap = require( './plugins/parent-map' )
const serializer = require( './plugins/serializer' )
const wrapNodes = require( './plugins/wrap-nodes' )
const accepts = require( './plugins/accepts' )

const treeFactory = ( adapter, plugins ) => {
  const fn = fnFactory( adapter )

  if( Array.isArray( plugins ) )
    plugins.forEach( plugin => plugin( fn ) )

  // create wrapped API
  const Tree = root => fn.createTree( root )

  const fnames = Object.keys( fn )

  fnames.forEach( fname => {
    const func = fn[ fname ]
    const def = func.def || {}
    const argTypes = Array.isArray( def.argTypes ) ? def.argTypes : []

    Tree[ fname ] = ( ...args ) => {
      if( argTypes.includes( 'fn' ) ){
        return func( fn, ...args )
      }

      return func( ...args )
    }
  })

  Tree.createRoot = value => Tree( Tree.createNode( value ) )
  Tree.fn = fn
  Tree.adapter = treeFactory
  Tree.plugin = plugin => plugin( fn )
  Tree.plugins = { parentMap, accepts, serializer, meta, wrapNodes }

  return Tree
}

module.exports = treeFactory(
  defaultAdapter,
  [  parentMap, accepts, serializer, meta, wrapNodes ]
)
