'use strict'

const inclusiveDescendant = ( api, state, core ) => {
  api.inclusiveDescendant = api.dfs

  api.registerGenerator( 'inclusiveDescendant' )
}

module.exports = inclusiveDescendant
