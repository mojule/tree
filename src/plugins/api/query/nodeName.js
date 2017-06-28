'use strict'

const is = require( '@mojule/is' )

const nodeName = ({ api, privates }) => {
  privates.registerGet({
    target: api,
    name: 'nodeName',
    get: () => {
      if( is.object( api.meta ) && is.string( api.meta.nodeName ) )
        return api.meta.nodeName

      return 'node'
    }
  })
}

module.exports = nodeName
