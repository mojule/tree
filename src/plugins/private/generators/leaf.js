'use strict'

const leaf = ({ privates, core }) => {
  privates.leaf = function*(){
    const { getApi } = core

    for( let current of privates.dfs() )
      if( current.firstChild === undefined ){
        yield current
      }
  }

  privates.registerGenerator( 'leaf' )
}

module.exports = leaf
