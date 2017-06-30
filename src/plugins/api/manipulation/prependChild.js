'use strict'

const HierarchyError = require( './hierarchyError' )

const prependChild = ({ api, state, core }) => {
  api.prependChild = child => {
    if( !api.accepts( child ) )
      throw HierarchyError( api.nodeName, child.nodeName )

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
