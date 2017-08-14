'use strict'

const utils = require( '@mojule/utils' )

const { hyphenatedToCamelCase } = utils

const createNode = ({ statics, core, Api }) => {
  const { nodeTypes } = core

  Object.keys( nodeTypes ).forEach( name => {
    const fname = 'create' + hyphenatedToCamelCase( name, true )

    statics[ fname ] = ( ...args ) => core.createNode( name, ...args )
  })
}

module.exports = createNode
