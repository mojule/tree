'use strict'

const getNodeType = fn => {
  const nodeType = ( fn, node ) => {
    const value = fn.value( node )

    if( typeof value.nodeType === 'string' && value.nodeType.length > 0 )
      return value.nodeType

    return 'treeNode'
  }

  nodeType.def = {
    argType: [ 'fn', 'node' ],
    returnType: 'string',
    require: [ 'value' ],
    categories: [ 'node', 'plugin' ]
  }

  return Object.assign( fn, { nodeType } )
}

module.exports = getNodeType
