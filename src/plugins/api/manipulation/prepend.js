'use strict'

const prepend = ({ api }) => {
  api.prepend = ( ...nodes ) => {
    const { length } = nodes

    for( let i = length - 1; i >= 0; i-- )
      api.prependChild( nodes[ i ] )

    return nodes
  }
}

module.exports = prepend
