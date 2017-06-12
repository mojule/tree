'use strict'

const item = api => {
  api.item = ( generator, index ) => {
    let i = 0

    for( let current of generator() ){
      if( i === index ){
        return current
      }

      i++
    }
  }
}

module.exports = item
