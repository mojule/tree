'use strict'

const removeAll = ({ api, state, core }) => {
  api.removeAll = () => {
    const { getApi } = core
    const removed = []

    while( state.firstChild )
      removed.push( api.removeChild( getApi( state.firstChild ) ) )

    return removed
  }
}

module.exports = removeAll
