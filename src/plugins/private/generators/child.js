'use strict'

const child = ({ privates, state, core }) => {
  privates.child = function*(){
    const { getApi } = core
    let current = state.firstChild

    while( current ){
      yield getApi( current )

      current = current.nextSibling
    }
  }

  privates.registerGenerator( 'child' )
}

module.exports = child
