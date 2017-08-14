'use strict'

const inclusiveAncestor = ({ privates, state, core }) => {
  privates.inclusiveAncestor = function*(){
    const { getApi } = core

    yield getApi( state )

    for( let current of privates.ancestor() )
      yield current
  }

  privates.registerGenerator( 'inclusiveAncestor' )
}

module.exports = inclusiveAncestor
