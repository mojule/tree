'use strict'

const utils = require( '@mojule/utils' )

const { capitalizeFirstLetter } = utils

const find = ({ api, state, core, privates }) => {
  api.find = ( ...args ) => {
    let name = args[ 0 ]
    let predicate = args[ 1 ]

    if( typeof name === 'function' ){
      predicate = name
      name = 'dfs'
    }

    const walk = api[ name ]
    let target

    walk( current => {
      if( predicate( current ) )
        return ( target = current )
    })

    return target
  }

  privates.generatorNames.forEach( name => {
    const fname = `find${ capitalizeFirstLetter( name ) }`

    api[ fname ] = predicate => api.find( name, predicate )
  })
}

module.exports = find
