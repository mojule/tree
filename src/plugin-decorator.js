'use strict'

const pluginDecorator = ( obj, plugins ) => {
  const hasFunction = fname => ( typeof obj[ fname ] === 'function' )

  plugins.forEach( plugin => {
    if( Array.isArray( plugin.requirements ) && !plugin.requirements.every( hasFunction ) ){
      console.log( 'could not add', plugin.name )
      return
    }

    Object.assign( obj, plugin( obj ) )
  })

  return obj
}

module.exports = pluginDecorator
