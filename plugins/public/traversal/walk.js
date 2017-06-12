'use strict'

const is = require( '@mojule/is' )
const utils = require( '@mojule/utils' )

const { capitalizeFirstLetter } = utils

const walk = ( api, state, core, privates ) => {
  api.walk = ( name, visit ) => {
    if( is.function( name ) )
      return api.walk( 'dfs', name )

    const iterable = privates[ name ]()

    if( !visit )
      return iterable

    for( let current of iterable )
      if( visit( current ) ) break
  }

  privates.generatorNames.forEach( name => {
    const fname = `get${ capitalizeFirstLetter( name ) }`

    api[ name ] = visit => api.walk( name, visit )
    api[ fname ] = () => Array.from( privates[ name ]() )
  })
}

module.exports = walk
