'use strict'

const TreeFactory = require( '@mojule/tree-factory' )
const is = require( '@mojule/is' )
const adapter = require( './adapter' )
const defaultPlugins = require( './plugins' )

const Factory = ( ...plugins ) => {
  let options = {}

  if( plugins.length > 0 && is.object( plugins[ plugins.length - 1 ] ) )
    options = plugins.pop()

  if( plugins.length === 1 && is.array( plugins[ 0 ] ) )
    plugins = plugins[ 0 ]

  plugins = defaultPlugins.concat( plugins )

  return TreeFactory( adapter, plugins, options )
}

const Tree = Factory()

Object.assign( Tree, { Factory } )

module.exports = Tree
