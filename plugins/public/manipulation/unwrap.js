'use strict'

const unwrap = ( api, state, core ) => {
  api.unwrap = () => {
    if( state.parentNode === undefined )
      throw Error( 'Cannot unwrap a root node' )

    const { getApi } = core
    const parent = getApi( state.parentNode )
    const current = getApi( state )

    current.removeAll().forEach(
      child => parent.insertBefore( child, current )
    )

    return parent.removeChild( current )
  }
}

module.exports = unwrap
