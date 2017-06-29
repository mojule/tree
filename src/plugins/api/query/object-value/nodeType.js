'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ api, state, privates }) => {
  if( !is.object( state.value ) ) return

  const defaultNodeType = api.nodeType

  privates.registerGet({
    target: api,
    name: 'nodeType',
    get: () => {
      if( 'nodeType' in state.value ){
        if( !is.integer( state.value.nodeType ) )
          throw Error( 'Expected nodeType to be an integer' )

        return state.value.nodeType
      }


      return defaultNodeType
    }
  })
}

module.exports = nodeType
