'use strict'

// todo: add the generators as well!
const generators = [ 'entries', 'keys', 'values' ]
const higher = [
  'every', 'filter', 'find', 'findIndex', 'forEach', 'includes', 'indexOf',
  'map', 'reduce', 'slice', 'some'
]

const is = require( '@mojule/is' )

const nodeList = ( api, state, core ) => {
  api.nodeList = generator => {
    const list = higher.reduce(
      ( obj, name ) => {
        obj[ name ] = ( ...args ) => api[ name ]( generator, ...args )
        return obj
      },
      {
        [ Symbol.iterator ]: generator,
      }
    )

    Object.defineProperty( list, 'length', {
      get: () => api.length( generator )
    })

    const proxy = new Proxy( list, {
      get: ( target, name ) => {
        if( name in target )
          return target[ name ]

        const index = parseInt( name, 10 )

        if( is.integer( index ) )
          return api.item( generator, index )
      }
    })

    return proxy
  }
}

module.exports = nodeList
