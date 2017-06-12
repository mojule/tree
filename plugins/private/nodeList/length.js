'use strict'

const length = api => {
  api.length = generator => Array.from( generator() ).length
}

module.exports = length
