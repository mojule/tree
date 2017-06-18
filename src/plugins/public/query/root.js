'use strict'

const root = ({ api }) => {
  api.root = () => api.findInclusiveAncestor( current => current.parentNode === undefined )
}

module.exports = root
