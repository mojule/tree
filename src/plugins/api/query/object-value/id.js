'use strict'

const utils = require( '@mojule/utils' )
const is = require( '@mojule/is' )

const { id } = utils

const nodeId = ({ api, state, core, privates }) => {
  if( !is.object( state.value ) ) return

  core.registerProperty({
    target: api,
    name: 'id',
    get: () => {
      if( !is.string( state.value.id ) )
        state.value.id = id( api.nodeName.replace( /#/g, '' ) )

      return state.value.id
    }
  })
}

module.exports = nodeId
