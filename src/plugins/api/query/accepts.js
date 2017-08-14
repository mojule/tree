'use strict'

const accepts = ({ api, state, core }) => {
  api.accepts = child => {
    const { getApi, accepts } = core
    const node = getApi( state )

    return accepts( node, child )
  }
}

module.exports = accepts
