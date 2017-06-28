'use strict'

const is = require( '@mojule/is' )

const assign = ({ api, state }) => {
  if( !is.object( state.value ) ) return

  api.assign = obj => Object.assign( state.value, obj )
}

module.exports = assign
