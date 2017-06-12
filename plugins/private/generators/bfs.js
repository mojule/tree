'use strict'

const bfs = ( api, state, core ) => {
  api.bfs = function*(){
    const { getApi } = core
    const nodes = [ state ]

    while( nodes.length > 0 ){
      const current = nodes.shift()

      yield getApi( current )

      let child = current.firstChild

      while( child ){
        nodes.push( child )
        child = child.nextSibling
      }
    }
  }

  api.registerGenerator( 'bfs' )
}

module.exports = bfs
