'use strict'

const isLeaf = ({ api, state }) => {
  api.isLeaf = () => state.firstChild === undefined
}

module.exports = isLeaf
