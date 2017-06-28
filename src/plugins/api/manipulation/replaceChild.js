'use strict'

const replaceChild = ({ api, state, core }) => {
  api.replaceChild = ( old, child ) => {
    api.insertBefore( child, old )
    api.removeChild( old )

    return child
  }
}

module.exports = replaceChild
