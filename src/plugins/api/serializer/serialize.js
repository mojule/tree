'use strict'

const serialize = ({ api, state, core }) => {
  api.serialize = ( mapper = value => value ) => {
    const { getState } = core
    const states = new Map()

    const create = currentState => {
      const value = mapper( currentState.value )
      const serialized = [ value ]

      states.set( currentState, serialized )

      return serialized
    }

    const root = create( state )

    api.dfsNodes.forEach( current => {
      if( api === current ) return

      const currentState = getState( current )
      const serialized = create( currentState )
      const parent = states.get( currentState.parentNode )

      parent.push( serialized )
    })

    return root
  }
}

module.exports = serialize
