'use strict'

const before = ({ api, state, core }) => {
  api.before = child => {
    if( state.parentNode === undefined )
      throw Error( 'Cannot call before on a root node' )

    const { getApi } = core
    const current = getApi( state )

    return api.parentNode.insertBefore( child, current )
  }
}

module.exports = before
