'use strict'

const map = ({ privates }) => {
  privates.map = ( generator, transform ) => {
    const result = []
    let i = 0

    for( let current of generator() ){
      result.push( transform( current, i ) )

      i++
    }

    return result
  }
}

module.exports = map
