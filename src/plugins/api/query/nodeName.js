'use strict'

const is = require( '@mojule/is' )

const nodeName = ({ api, core }) => {
  core.registerProperty({
    target: api,
    name: 'nodeName',
    get: () => '#' + core.getNodeTypeName( api.nodeType )
  })
}

module.exports = nodeName
