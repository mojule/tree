'use strict'

const previousSibling = ({ privates, state, core }) => {
  privates.previousSibling = function*(){
    const { getApi } = core
    let current = state.previousSibling

    while( current ){
      yield getApi( current )

      current = current.previousSibling
    }
  }

  privates.registerGenerator( 'previousSibling' )
}

module.exports = previousSibling
