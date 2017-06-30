'use strict'

const nodeType = ({ statics, core, Api }) => {
  const { nodeTypes } = core

  Object.keys( nodeTypes ).forEach( name => {
    const enumName = name.toUpperCase().replace( /-/g, '_' ) + '_NODE'

    core.registerProperty({
      target: statics,
      name: enumName,
      get: () => nodeTypes[ name ]
    })
  })
}

module.exports = nodeType
