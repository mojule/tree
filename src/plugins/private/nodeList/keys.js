'use strict'

const keys = ({ privates }) => {
  privates.keys = function*( generator ){
    let i = 0

    for( let item of generator() ){
      yield i

      i++
    }
  }
}

module.exports = keys
