'use strict'

const sibling = ( api, state, core ) => {
  api.sibling = function*(){
    if( !state.parentNode )
      return

    const { getApi } = core

    let current = state.parentNode.firstChild

    while( current ){
      if( current !== state )
        yield getApi( current )

      current = current.nextSibling
    }
  }

  api.registerGenerator( 'sibling' )
}

module.exports = sibling
