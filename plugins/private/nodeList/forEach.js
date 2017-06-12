'use strict'

const forEach = api => {
  api.forEach = ( generator, callback ) => {
    let i = 0

    for( let current of generator() ){
      callback( current, i )

      i++
    }
  }
}

module.exports = forEach
