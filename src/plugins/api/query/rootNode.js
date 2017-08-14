'use strict'

const rootNode = ({ api, core }) => {
  core.registerProperty({
    target: api,
    name: 'rootNode',
    get: () => api.inclusiveAncestorNodes.find( current =>
      current.parentNode === undefined
    )
  })
}

module.exports = rootNode
