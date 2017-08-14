'use strict'

const branch = ({ privates, core }) => {
  privates.branch = function*(){
    const { getApi } = core

    for( let current of privates.dfs() )
      if( current.firstChild !== undefined ){
        yield current
      }
  }

  privates.registerGenerator( 'branch' )
}

module.exports = branch
