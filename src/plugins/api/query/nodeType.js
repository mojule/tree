'use strict'

const utils = require( '@mojule/utils' )

const { hyphenatedToCamelCase } = utils

const nodeType = ({ api, core, privates }) => {
  core.registerProperty({
    target: api,
    name: 'nodeType',
    get: () => 0
  })

  const { nodeTypes } = core

  Object.keys( nodeTypes ).forEach( name => {
    const fname = 'is' + hyphenatedToCamelCase( name, true ) + 'Node'

    api[ fname ] = () => core.getNodeTypeName( api.nodeType ) === name
  })
}

module.exports = nodeType
