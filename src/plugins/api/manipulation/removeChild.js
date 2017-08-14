'use strict'

const removeChild = ({ api, state, core }) => {
  api.removeChild = child => {
    const { getState } = core
    const childState = getState( child )

    if( state.firstChild === childState )
      state.firstChild = childState.nextSibling

    if( state.lastChild === childState )
      state.lastChild = childState.previousSibling

    if( childState.previousSibling )
      childState.previousSibling.nextSibling = childState.nextSibling

    if( childState.nextSibling )
      childState.nextSibling.previousSibling = childState.previousSibling

    childState.parentNode = undefined
    childState.previousSibling = undefined
    childState.nextSibling = undefined

    return child
  }
}

module.exports = removeChild
