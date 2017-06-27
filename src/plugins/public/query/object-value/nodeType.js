'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ api, state }) => {
  if( !is.object( state.value ) ) return

  const defaultNodeType = api.nodeType

  Object.defineProperty( api, 'nodeType', {
    get: () => {
      if( is.string( state.value.nodeType ) )
        return state.value.nodeType

      return defaultNodeType
    },
    enumerable: true,
    configurable: true
  })
}

module.exports = nodeType
