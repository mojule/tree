'use strict'

const acceptsNode = fn => {
  const accepts = ( fn, node, childNode ) => !fn.isEmpty( fn, node ) //eslint-disable-line no-unused-vars

  accepts.def = {
    argType: [ 'fn', 'node', 'node' ],
    returnType: 'boolean',
    require: [ 'isEmpty' ],
    categories: [ 'node', 'plugin' ]
  }

  const originalInsertBefore = fn.insertBefore

  const insertBefore = ( fn, root, parentNode, childNode, referenceNode ) => {
    if( !fn.accepts( fn, parentNode, childNode ) )
      throw new Error( 'Node cannot accept this child' )

    return originalInsertBefore( fn, root, parentNode, childNode, referenceNode )
  }

  insertBefore.def = originalInsertBefore.def

  return Object.assign( fn, { accepts, insertBefore } )
}

module.exports = acceptsNode
