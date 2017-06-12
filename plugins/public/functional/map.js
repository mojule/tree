'use strict'

const map = ( api, state, core, privates, statics ) => {
  api.map = ( createNode = statics.create, mapper = value => value ) => {
    const { value } = state
    const mapped = mapper( value )
    const result = createNode( mapped )

    api.childNodes.forEach( current => {
      const child = current.map( createNode, mapper )

      result.appendChild( child )
    })

    return result
  }
}

module.exports = map
