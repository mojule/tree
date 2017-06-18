'use strict'

const some = ({ privates }) => {
  privates.some = ( generator, predicate ) => {
    let i = 0

    for( let current of generator() ){
      if( predicate( current, i ) )
        return true

      i++
    }

    return false
  }
}

module.exports = some
