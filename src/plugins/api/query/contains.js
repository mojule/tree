'use strict'

const contains = ({ api }) => {
  api.contains = descendant => api.descendantNodes.includes( descendant )
}

module.exports = contains
