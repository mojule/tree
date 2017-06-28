'use strict'

const hasChildNodes = ({ api, state }) => {
  api.hasChildNodes = () => state.firstChild !== undefined
}

module.exports = hasChildNodes
