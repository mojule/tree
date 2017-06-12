'use strict'

const appendChild = ( api, state, core ) => {
  api.appendChild = child => {
    const { getState, getApi } = core
    const childState = getState( child )

    if( state.lastChild )
      return api.insertAfter( child, getApi( state.lastChild ) )

    childState.parentNode = state
    state.firstChild = state.lastChild = childState

    return child
  }
}

module.exports = appendChild
