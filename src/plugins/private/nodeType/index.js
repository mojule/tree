'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ privates, Api }) => {
  const nameToNodeType = new Map()
  const nodeTypeToName = new Map()

  privates.registerNodeType = ({
    nodeType,
    nodeName,
  }) => {
    if( !is.integer( nodeType ) )
      throw Error( 'Expected nodeType to be an integer' )

    if( !is.string( nodeName ) )
      throw Error( 'Expected nodeName to be a string' )

    if( nodeTypeToName.has( nodeType ) )
      throw Error(
        `nodeType ${ nodeType } is already registered to ${ nodeTypeToName.get( nodeType ) }`
      )

    if( nameToNodeType.has( nodeName ) )
      throw Error(
        `nodeName ${ nodeName } is already registered to ${ nameToNodeType.get( nodeName ) }`
      )

    nodeTypeToName.set( nodeType, nodeName )
    nameToNodeType.set( nodeName, nodeType )
  }

  privates.hasNodeType = nodeType => nodeTypeToName.has( nodeType )
  privates.hasNodeName = nodeName => nameToNodeType.has( nodeName )

  privates.getNodeName = nodeType => nodeTypeToName.get( nodeType )
  privates.getNodeType = nodeName => nameToNodeType.get( nodeName )

  privates.registerGet({
    target: privates,
    name: 'nodeTypes',
    get: () => [ ...nameToNodeType.keys() ].reduce( ( obj, nodeName ) => {
      obj[ nodeName ] = nameToNodeType.get( nodeName )
      return obj
    }, {} )
  })
}

module.exports = nodeType
