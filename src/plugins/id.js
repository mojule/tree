'use strict'

const utils = require( 'mojule-utils' )

const lazyId = fn => {
  const id = ( fn, node ) => {
    const value = fn.value( node )

    if( value._id )
      return value._id

    const nodeType = fn.nodeType( node )
    const id = utils.id( nodeType )

    value._id = id

    fn.value( node, value )

    return id
  }

  id.def = {
    argTypes: [ 'fn', 'node' ],
    returnType: 'string',
    require: [ 'value', 'nodeType' ],
    categories: [ 'node', 'plugin' ]
  }

  return Object.assign( fn, { id } )
}

module.exports = lazyId
