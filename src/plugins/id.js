'use strict'

const utils = require( '@mojule/utils' )

const idModule = ( node, state ) => {
  const id = () => {
    const value = node.getValue()

    if( value.id )
      return value.id

    const nodeType = node.nodeType()
    const id = utils.id( nodeType )

    value.id = id

    node.setValue( value )

    return id
  }

  return { id }
}

module.exports = idModule
