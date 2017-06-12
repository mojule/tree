'use strict'

const descendant = ( api, state, core ) => {
  api.descendant = function*(){
    const { getApi } = core

    for( let current of api.dfs() )
      if( current !== getApi( state ) ){
        yield current
      }
  }

  api.registerGenerator( 'descendant' )
}

module.exports = descendant
