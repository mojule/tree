'use strict'

const get = [
  'parentNode', 'previousSibling', 'nextSibling', 'firstChild', 'lastChild'
]

const properties = ({ api, state, core }) => {
  const { getApi } = core

  get.forEach( name => {
    Object.defineProperty( api, name, {
      get: () => getApi( state[ name ] )
    })
  })

  Object.defineProperty( api, 'value', {
    get: () => state.value,
    set: value => state.value = value
  })
}

module.exports = properties
