'use strict'

const replaceChild = ({ api, state, core }) => {
  api.replaceChild = ( old, child ) => {
    api.insertBefore( child, old )
    api.removeChild( child )

    return child
  }
}

module.exports = replaceChild
