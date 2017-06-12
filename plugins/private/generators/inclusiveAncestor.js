'use strict'

const inclusiveAncestor = ( api, state, core ) => {
  api.inclusiveAncestor = function*(){
    const { getApi } = core

    yield getApi( state )

    for( let current of api.ancestor() )
      yield current
  }

  api.registerGenerator( 'inclusiveAncestor' )
}

module.exports = inclusiveAncestor
