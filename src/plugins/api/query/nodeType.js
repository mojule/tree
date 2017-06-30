'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ api, core, privates }) => {
  core.registerProperty({
    target: api,
    name: 'nodeType',
    get: () => 0
  })
}

module.exports = nodeType
