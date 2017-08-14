'use strict'

const nextSibling = ({ privates, state, core }) => {
  privates.nextSibling = function*(){
    const { getApi } = core
    let current = state.nextSibling

    while( current ){
      yield getApi( current )

      current = current.nextSibling
    }
  }

  privates.registerGenerator( 'nextSibling' )
}

module.exports = nextSibling
