'use strict'

const every = api => {
  api.every = ( generator, predicate ) => {
    let i = 0

    for( let current of generator() ){
      if( !predicate( current, i ) )
        return false

      i++
    }

    return true
  }
}

module.exports = every
