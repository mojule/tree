'use strict'

const depth = ({ api, state }) => {
  api.depth = () => {
    let depth = 0
    let current = state.parentNode

    while( current ){
      current = current.parentNode
      depth++
    }

    return depth
  }
}

module.exports = depth
