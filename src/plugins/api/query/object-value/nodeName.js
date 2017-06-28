'use strict'

const is = require( '@mojule/is' )

const nodeName = ({ api, state, privates }) => {
  if( !is.object( state.value ) ) return

  const defaultNodeName = api.nodeName

  privates.registerGet({
    target: api,
    name: 'nodeName',
    get: () => {
      if( is.string( state.value.nodeName ) )
        return state.value.nodeName

      return defaultNodeName
    }
  })
}

module.exports = nodeName
