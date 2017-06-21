'use strict'

const root = ({ api }) => {
  api.root = () => api.inclusiveAncestorNodes.find( current =>
    current.parentNode === undefined
  )
}

module.exports = root
