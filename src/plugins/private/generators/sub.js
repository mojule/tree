'use strict'

const sub = ({ privates }) => {
  privates.sub = privates.dfs

  privates.registerGenerator( 'sub' )
}

module.exports = sub
