'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ api, state, core }) => {
  if( !is.object( state.value ) ) return

  const defaultNodeType = api.nodeType

  core.registerProperty({
    target: api,
    name: 'nodeType',
    get: () => state.value.nodeType || defaultNodeType
  })
}

module.exports = nodeType
