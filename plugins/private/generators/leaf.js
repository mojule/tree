'use strict'

const leaf = ( api, state, core ) => {
  api.leaf = function*(){
    const { getApi } = core

    for( let current of api.dfs() )
      if( current.firstChild === undefined ){
        yield current
      }
  }

  api.registerGenerator( 'leaf' )
}

module.exports = leaf
