'use strict'

const isEmpty = ({ api, state, core }) => {
  api.isEmpty = () => {
    const { getApi, isEmpty } = core
    const node = getApi( state )

    return isEmpty( node )
  }
}

module.exports = isEmpty
