'use strict'

const get = [
  'parentNode', 'previousSibling', 'nextSibling', 'firstChild', 'lastChild'
]

const properties = ({ api, state, core, privates }) => {
  const { getApi } = core

  get.forEach( name => {
    privates.registerGet({
      target: api,
      name,
      get: () => getApi( state[ name ] )
    })
  })

  privates.registerProperty({
    target: api,
    name: 'value',
    get: () => state.value,
    set: value => state.value = value
  })
}

module.exports = properties
