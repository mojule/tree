'use strict'

const utils = require( '@mojule/utils' )
const is = require( '@mojule/is' )

const { id } = utils

const nodeType = ({ api, state }) => {
  if( !is.object( state.value ) ) return

  Object.defineProperty( api, 'id', {
    get: () => {
      if( !is.string( state.value.id ) )
        state.value.id = id( api.nodeType )

      return state.value.id
    }
  })
}

module.exports = nodeType
