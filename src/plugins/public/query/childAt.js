'use strict'

const childAt = ({ api, state, core }) => {
  api.childAt = index => {
    const { getApi } = core
    let currentIndex = 0
    let current = state.firstChild

    while( current && currentIndex !== index ){
      current = current.nextSibling
      currentIndex++
    }

    return getApi( current )
  }
}

module.exports = childAt
