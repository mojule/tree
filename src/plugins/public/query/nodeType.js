'use strict'

const nodeType = ({ api }) => {
  Object.defineProperty( api, 'nodeType', {
    get: () => 'node'
  })
}

module.exports = nodeType
