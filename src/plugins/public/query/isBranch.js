'use strict'

const isBranch = ({ api, state }) => {
  api.isBranch = () => state.firstChild !== undefined
}

module.exports = isBranch
