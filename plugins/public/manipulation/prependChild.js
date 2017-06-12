'use strict'

const prependChild = ( api, state, core ) => {
  api.prependChild = child => {
    const { getState, getApi } = core

    if( state.firstChild )
      return api.insertBefore( child, getApi( state.firstChild ) )

    const childState = getState( child )

    childState.parentNode = state
    state.firstChild = state.lastChild = childState

    return child
  }
}

module.exports = prependChild
