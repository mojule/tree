'use strict'

const remove = ( api, state, core ) => {
  api.remove = () => {
    if( !state.parentNode )
      throw Error( 'Node has no parent to remove itself from!' )

    const { getApi } = core
    const parent = getApi( state.parentNode )
    const current = getApi( state )

    return parent.removeChild( current )
  }
}

module.exports = remove
