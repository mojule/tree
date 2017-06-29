'use strict'

const after = ({ api, state, core }) => {
  api.after = child => {
    if( state.parentNode === undefined )
      throw Error( 'Cannot call after on a root node' )

    const { getApi } = core
    const current = getApi( state )

    return api.parentNode.insertAfter( child, current )
  }
}

module.exports = after
