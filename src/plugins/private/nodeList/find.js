'use strict'

const find = ({ privates }) => {
  privates.find = ( generator, predicate ) => {
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
