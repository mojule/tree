'use strict'

const HierarchyError = require( './hierarchyError' )

const insertBefore = ({ api, state, core }) => {
  api.insertBefore = ( child, reference ) => {
    if( !api.accepts( child ) )
      throw HierarchyError( api.nodeName, child.nodeName )

    if( reference === undefined )
      return api.appendChild( child )

    const { getState } = core
    const referenceState = getState( reference )

    if( referenceState.parentNode !== state )
      throw Error( 'Reference node is not a child of the current node' )

    if( child.parentNode )
      child.parentNode.removeChild( child )

    const childState = getState( child )

    childState.parentNode = state
    childState.previousSibling = referenceState.previousSibling
    childState.nextSibling = referenceState

    if( referenceState.previousSibling )
      referenceState.previousSibling.nextSibling = childState

    referenceState.previousSibling = childState

    if( state.firstChild === referenceState )
      state.firstChild = childState

    return child
  }
}

module.exports = insertBefore
