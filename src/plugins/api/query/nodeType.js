'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ api, privates }) => {
  privates.registerNodeType({
    nodeType: 0,
    nodeName: '#node'
  })

  privates.registerGet({
    target: api,
    name: 'nodeType',
    get: () => 0
  })
}

module.exports = nodeType
