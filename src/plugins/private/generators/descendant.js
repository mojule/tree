'use strict'

const descendant = ({ privates, state, core }) => {
  privates.descendant = function*(){
    const { getApi } = core

    for( let current of privates.dfs() )
      if( current !== getApi( state ) ){
        yield current
      }
  }

  privates.registerGenerator( 'descendant' )
}

module.exports = descendant
