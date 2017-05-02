'use strict'

const exposeProperties = require( './expose-properties' )
const is = require( '@mojule/is' )

const FactoryFactory = ( BaseFactory, defaultPlugins = [], defaultOptions = {}, adapter = null ) => {
  const Factory = ( ...plugins ) => {
    let options = {}

    if( plugins.length > 0 && is.object( plugins[ plugins.length - 1 ] ) )
      options = plugins.pop()

    options = Object.assign( {}, defaultOptions, options )

    if( plugins.length === 1 && is.array( plugins[ 0 ] ) )
      plugins = plugins[ 0 ]

    plugins = defaultPlugins.concat( plugins )

    if( is.array( options.exposeProperties ) ){
      plugins.push( exposeProperties( options.exposeProperties ) )
    }

    if( !is.null( adapter ) )
      return BaseFactory( adapter, plugins, options )

    return BaseFactory( plugins, options )
  }

  return Factory
}

module.exports = FactoryFactory
