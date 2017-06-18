'use strict'

const utils = require( '@mojule/utils' )

const { capitalizeFirstLetter } = utils

const findAll = ({ api, state, core, privates }) => {
  api.findAll = ( ...args ) => {
    let name = args[ 0 ]
    let predicate = args[ 1 ]

    if( typeof name === 'function' ){
      predicate = name
      name = 'dfs'
    }

    const walk = api[ name ]
    const result = []

    walk( current => {
      if( predicate( current ) )
        result.push( current )
    })

    return result
  }

  privates.generatorNames.forEach( name => {
    const fname = `findAll${ capitalizeFirstLetter( name ) }`

    api[ fname ] = predicate => api.findAll( name, predicate )
  })
}

module.exports = findAll
