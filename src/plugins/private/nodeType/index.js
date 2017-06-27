'use strict'

const nodeType = ({ privates, Api }) => {
  const nodeTypes = new Map()

  privates.createNode = ( nodeType, value ) =>
    Api( Object.assign( { nodeType }, value ) )

  privates.registerNodeType = ({
    name = 'node',
    isEmpty = false,
    accepts = () => !privates.isEmpty( name )
  }) =>
    nodeTypes.set( name, { name, isEmpty, accepts } )


  privates.isEmpty = name => {
    if( nodeTypes.has( name ) )
      return nodeTypes.get( name ).isEmpty === true

    return false
  }

  privates.accepts = ( name, childName ) => {
    if( nodeTypes.has( name ) )
      return nodeTypes.get( name ).accepts( childName )

    return !privates.isEmpty( name )
  }

  Object.defineProperty( privates, 'nodeTypes', {
    get: () => Array.from( nodeTypes.keys() )
  })
}

module.exports = nodeType
