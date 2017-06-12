'use strict'

const wrap = ( api, state, core ) => {
  api.wrap = wrapper => {
    const { getApi } = core

    const current = getApi( state )

    if( state.parentNode ){
      const parent = getApi( state.parentNode )

      parent.insertBefore( wrapper, current )
    }

    return wrapper.appendChild( current )
  }
}

module.exports = wrap
