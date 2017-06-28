'use strict'

const rootNode = ({ api, privates }) => {
  privates.registerGet({
    target: api,
    name: 'rootNode',
    get: () => api.inclusiveAncestorNodes.find( current =>
      current.parentNode === undefined
    )
  })
}

module.exports = rootNode
