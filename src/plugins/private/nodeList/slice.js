'use strict'

const slice = ({ privates }) => {
  privates.slice = ( generator, begin = 0, end = Number.MAX_SAFE_INTEGER ) => {
    if( begin < 0 || end < 0 )
      return Array.from( generator() ).slice( begin, end )

    const result = []
    let i = 0

    for( let item of generator() ){
      if( i > begin && i < end )
        result.push( item )

      i++
    }
  }
}

module.exports = slice
