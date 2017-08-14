'use strict'

const wrapInner = ({ api, state, core }) => {
  api.wrapInner = wrapper => {
    const { getApi } = core

    const current = getApi( state )
    const childNodes = current.removeAll()

    current.appendChild( wrapper )

    childNodes.forEach( child => wrapper.appendChild( child ) )

    return wrapper
  }
}

module.exports = wrapInner
