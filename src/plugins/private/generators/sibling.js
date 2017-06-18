'use strict'

const sibling = ({ privates, state, core }) => {
  privates.sibling = function*(){
    if( state.parentNode === undefined )
      return

    const { getApi } = core

    let current = state.parentNode.firstChild

    while( current ){
      if( current !== state )
        yield getApi( current )

      current = current.nextSibling
    }
  }

  privates.registerGenerator( 'sibling' )
}

module.exports = sibling
