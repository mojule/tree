'use strict'

const branch = ( api, state, core ) => {
  api.branch = function*(){
    const { getApi } = core

    for( let current of api.dfs() )
      if( current.firstChild !== undefined ){
        yield current
      }
  }

  api.registerGenerator( 'branch' )
}

module.exports = branch
