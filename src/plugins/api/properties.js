'use strict'

const get = [
  'parentNode', 'previousSibling', 'nextSibling', 'firstChild', 'lastChild'
]

const properties = ({ api, state, core, privates }) => {
  const { getApi } = core

  get.forEach( name => {
    core.registerProperty({
      target: api,
      name,
      get: () => getApi( state[ name ] )
    })
  })

  core.registerProperty({
    target: api,
    name: 'value',
    get: () => state.value,
    set: value => state.value = value
  })
}

module.exports = properties
