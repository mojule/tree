'use strict'

const length = ({ privates }) => {
  privates.length = generator => Array.from( generator() ).length
}

module.exports = length
