'use strict'

const HierarchyError = require( './hierarchyError' )

const appendChild = ({ api, state, core }) => {
  api.appendChild = child => {
    if( !api.accepts( child ) )
      throw HierarchyError( api.nodeName, child.nodeName )

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
