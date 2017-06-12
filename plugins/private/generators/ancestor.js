'use strict'

const ancestor = ( api, state, core ) => {
  api.ancestor = function*(){
    const { getApi } = core

    let current = state.parentNode

    while( current ){
      yield getApi( current )

      current = current.parentNode
    }
  }

  api.registerGenerator( 'ancestor' )
}

module.exports = ancestor
