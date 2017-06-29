'use strict'

const is = require( '@mojule/is' )

const nodeName = ({ api, privates }) => {
  privates.registerGet({
    target: api,
    name: 'nodeName',
    get: () => privates.getNodeName( api.nodeType )
  })
}

module.exports = nodeName
