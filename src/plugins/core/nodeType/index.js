'use strict'

const is = require( '@mojule/is' )

const nodeType = ({ core, Api }) => {
  const nameToNodeType = new Map()
  const nodeTypes = new Map()

  const idToNodeType = id => {
    let nodeType

    if( is.integer( id ) ){
      nodeType = id
    } else if ( is.string( id ) ){
      nodeType = nameToNodeType.get( id )
    }

    if( is.undefined( nodeType ) )
      throw Error( 'Expected id to be a nodeType or nodeType name' )

    return nodeType
  }

  const defaultCreate = ( id, value ) => {
    const nodeType = idToNodeType( id )

    value = Object.assign( { nodeType }, value )

    return Api( value )
  }

  core.registerNodeType = ({
    nodeType,
    name,
    isEmpty = node => false,
    accepts = ( parent, child ) => !core.isEmpty( parent ),
    create = value => defaultCreate( nodeType, value )
  }) => {
    if( !is.integer( nodeType ) )
      throw Error( 'Expected nodeType to be an integer' )

    if( !is.string( name ) )
      throw Error( 'Expected name to be a string' )

    if( nodeTypes.has( nodeType ) )
      throw Error(
        `nodeType ${ nodeType } is already registered to ${ nodeTypes.get( nodeType ).name }`
      )

    if( nameToNodeType.has( name ) )
      throw Error(
        `nodeName ${ name } is already registered to ${ nameToNodeType.get( name ) }`
      )

    nameToNodeType.set( name, nodeType )
    nodeTypes.set( nodeType, { nodeType, name, isEmpty, accepts, create } )
  }

  core.isEmpty = node => {
    if( nodeTypes.has( node.nodeType ) )
      return nodeTypes.get( node.nodeType ).isEmpty( node )

    return false
  }

  core.accepts = ( parent, child ) => {
    if( nodeTypes.has( parent.nodeType ) )
      return nodeTypes.get( parent.nodeType ).accepts( parent, child )

    return !core.isEmpty( parent.nodeType )
  }

  core.getNodeTypeName = nodeType => nodeTypes.get( nodeType ).name

  core.createNode = ( id, ...args ) => {
    const nodeType = idToNodeType( id )

    if( nodeTypes.has( nodeType ) ){
      const value = nodeTypes.get( nodeType ).create( ...args )

      return defaultCreate( nodeType, value )
    }

    return defaultCreate( nodeType, ...args )
  }

  core.registerProperty({
    target: core,
    name: 'nodeTypes',
    get: () => [ ...nameToNodeType.keys() ].reduce( ( obj, name ) => {
      obj[ name ] = nameToNodeType.get( name )
      return obj
    }, {} )
  })

  // default nodeType
  core.registerNodeType({
    nodeType: 0,
    name: 'node'
  })
}

module.exports = nodeType
