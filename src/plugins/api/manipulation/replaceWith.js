'use strict'

const replaceWith = ({ api, state, core }) => {
  api.replaceWith = ( ...nodes ) => {
    if( state.parentNode === undefined )
      throw Error( 'Cannot call replaceWith on a root node' )

    const { getApi } = core
    const reference = getApi( state )

    nodes.forEach( current => {
      api.parentNode.insertBefore( current, reference )
    })

    return api.parentNode.removeChild( reference )
  }
}

module.exports = replaceWith
