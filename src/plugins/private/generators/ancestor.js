'use strict'

const ancestor = ({ privates, state, core }) => {
  privates.ancestor = function*(){
    const { getApi } = core

    let current = state.parentNode

    while( current ){
      yield getApi( current )

      current = current.parentNode
    }
  }

  privates.registerGenerator( 'ancestor' )
}

module.exports = ancestor
