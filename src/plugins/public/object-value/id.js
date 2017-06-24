'use strict'

const utils = require( '@mojule/utils' )
const is = require( '@mojule/is' )

const nodeType = ({ api, state }) => {
  if( !is.object( state.value ) ) return
  
  Object.defineProperty( api, 'id', {
    get: () => {
      if( !is.string( state.value.id ) ){
        const id = utils.id( api.nodeType )

        state.value.id = id
      }
      
      return state.value.id
    }
  })
}

module.exports = nodeType
