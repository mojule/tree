'use strict'

const inclusiveDescendant = ({ privates }) => {
  privates.inclusiveDescendant = privates.dfs

  privates.registerGenerator( 'inclusiveDescendant' )
}

module.exports = inclusiveDescendant
