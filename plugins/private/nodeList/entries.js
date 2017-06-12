'use strict'

const entries = api => {
  api.entries = function*( generator ){
    let i = 0

    for( let current of generator() ){
      yield [ i, current ]

      i++
    }
  }
}

module.exports = entries
