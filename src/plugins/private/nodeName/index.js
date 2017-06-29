'use strict'

// todo refactor out to new nodeType stuff
const nodeName = ({ privates, Api }) => {
  const nodeNames = new Map()

  privates.createNode = ( nodeName, value ) =>
    Api( Object.assign( { nodeName }, value ) )

  privates.registerNodeName = ({
    name = 'node',
    isEmpty = false,
    accepts = () => !privates.isEmpty( name )
  }) =>
    nodeNames.set( name, { name, isEmpty, accepts } )

  privates.isEmpty = name => {
    if( nodeNames.has( name ) )
      return nodeNames.get( name ).isEmpty === true

    return false
  }

  privates.accepts = ( name, childName ) => {
    if( nodeNames.has( name ) )
      return nodeNames.get( name ).accepts( childName )

    return !privates.isEmpty( name )
  }

  privates.registerGet({
    target: privates,
    name: 'nodeNames',
    get: () =>  Array.from( nodeNames.keys() )
  })
}

module.exports = nodeName
