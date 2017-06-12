'use strict'

const includes = api => {
  api.includes = ( generator, target, fromIndex = 0 ) => {
    if( fromIndex < 0 )
      return Array.from( generator() ).includes( target, fromIndex )

    let i = 0

    for( let current of generator() ){
      if( i < fromIndex ) continue

      if( current === target )
        return true

      i++
    }

    return false
  }
}

module.exports = includes
