'use strict'

const is = require( '@mojule/is' )
const utils = require( '@mojule/utils' )

const { capitalizeFirstLetter } = utils

const has = ( api, state, core, privates ) => {
  api.has = ( ...args ) => {
    let name = args[ 0 ]
    let target = args[ 1 ]

    if( !is.string( name ) ){
      target = name
      name = 'dfs'
    }

    return !!api.find( name, current => current === target )
  }

  privates.generatorNames.forEach( name => {
    const fname = `has${ capitalizeFirstLetter( name ) }`

    api[ fname ] = target => api.has( name, target )
  })
}

module.exports = has
