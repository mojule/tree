'use strict'

const keys = api => {
  api.keys = function*( generator ){
    let i = 0

    for( let item of generator() ){
      yield i

      i++
    }
  }
}

module.exports = keys
