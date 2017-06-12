'use strict'

const index = ( api, state ) => {
  api.index = () => {
    if( !state.parentNode ) return

    let index = 0
    let current = state.previousSibling

    while( current ){
      current = current.previousSibling
      index++
    }

    return index
  }
}

module.exports = index
