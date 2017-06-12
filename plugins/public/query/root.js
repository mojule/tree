'use strict'

const root = ( api, state, core ) => {
  api.root = () => api.findInclusiveAncestor( current => current.parentNode === undefined )
}

module.exports = root
