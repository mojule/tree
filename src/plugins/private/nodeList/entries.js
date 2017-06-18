'use strict'

const entries = ({ privates }) => {
  privates.entries = function*( generator ){
    let i = 0

    for( let current of generator() ){
      yield [ i, current ]

      i++
    }
  }
}

module.exports = entries
