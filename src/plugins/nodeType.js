'use strict'

const is = require( '@mojule/is' )

const nodeTypeModule = ( node, state ) => {
  const { nodeType } = node

  return {
    nodeType: () => {
      const fromValue = node.getValue( 'nodeType' )

      if( is.string( fromValue ) )
        return fromValue

      return nodeType()
    }
  }
}

module.exports = nodeTypeModule
