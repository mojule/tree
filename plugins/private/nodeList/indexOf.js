'use strict'

const indexOf = api => {
  api.indexOf = ( generator, target, fromIndex ) => {
    if( fromIndex < 0 )
      return Array.from( generator() ).indexOf( target, fromIndex )

    let i = 0

    for( let current of generator() ){
      if( current === target )
        return i

      i++
    }

    return -1
  }
}

module.exports = indexOf
