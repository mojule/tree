'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ api }) => {
  Object.defineProperty( api, 'nodeType', {
    get: () => {
      if( is.object( api.meta ) && is.string( api.meta.nodeType ) )
        return api.meta.nodeType
        
      return 'node'
    }
  })
}

module.exports = nodeType
