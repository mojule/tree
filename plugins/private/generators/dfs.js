'use strict'

const dfs = ( api, state, core ) => {
  api.dfs = function*(){
    const { getApi } = core
    const nodes = [ state ]

    while( nodes.length > 0 ){
      const current = nodes.pop()

      yield getApi( current )

      let child = current.lastChild

      while( child ){
        nodes.push( child )
        child = child.previousSibling
      }
    }
  }

  api.registerGenerator( 'dfs' )
}

module.exports = dfs
