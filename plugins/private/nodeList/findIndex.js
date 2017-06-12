'use strict'

const findIndex = api => {
  api.findIndex = ( generator, predicate ) => {
    let i = 0

    for( let current of generator() ){
      if( predicate( current, i ) )
        return i

      i++
    }

    return -1
  }
}

module.exports = findIndex
