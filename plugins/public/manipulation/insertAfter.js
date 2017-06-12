'use strict'

const insertAfter = ( api, state, core ) => {
  api.insertAfter = ( child, reference ) => {
    if( !reference )
      return api.appendChild( child )

    const { getState } = core
    const referenceState = getState( reference )

    if( referenceState.parentNode !== state )
      throw Error( 'Reference node is not a child of the current node' )

    const childState = getState( child )

    childState.parentNode = state
    childState.previousSibling = referenceState
    childState.nextSibling = referenceState.nextSibling

    if( referenceState.nextSibling )
      referenceState.nextSibling.previousSibling = childState

    referenceState.nextSibling = childState

    if( state.lastChild === referenceState )
      state.lastChild = childState

    return child
  }
}

module.exports = insertAfter
