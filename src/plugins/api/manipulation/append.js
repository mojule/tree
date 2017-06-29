'use strict'

const append = ({ api }) => {
  api.append = ( ...nodes ) => {
    nodes.forEach( api.appendChild )

    return nodes
  }
}

module.exports = append
