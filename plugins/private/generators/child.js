'use strict'

const child = ( api, state, core ) => {
  api.child = function*(){
    const { getApi } = core
    let current = state.firstChild

    while( current ){
      yield getApi( current )

      current = current.nextSibling
    }
  }

  api.registerGenerator( 'child' )
}

module.exports = child
