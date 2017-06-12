'use strict'

const filter = api => {
  api.filter = ( generator, predicate ) => {
    const result = []
    let i = 0

    for( let current of generator() ){
      if( predicate( current, i ) )
        result.push( current )

      i++
    }

    return result
  }
}

module.exports = filter