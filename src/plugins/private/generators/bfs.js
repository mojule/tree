'use strict'

const bfs = ({ privates, state, core }) => {
  privates.bfs = function*(){
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

  privates.registerGenerator( 'bfs' )
}

module.exports = bfs
