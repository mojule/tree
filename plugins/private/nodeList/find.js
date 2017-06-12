'use strict'

const find = api => {
  api.find = ( generator, predicate ) => {
    let i = 0

    for( let current of generator() ){
      if( predicate( current, i ) ){
        return current
      }

      i++
    }
  }
}

module.exports = find
