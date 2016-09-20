'use strict'

const decorator = require( './plugin-decorator' )

const traversal = require( './plugins/traversal' )
const serializer = require( './plugins/serializer' )
const manipulation = require( './plugins/manipulation' )
const parentMap = require( './plugins/parent-map' )
const api = require( './plugins/api' )

const basePlugins = [ traversal, manipulation, serializer ]
const postPlugins = [ parentMap, api ]

const factory = adapter => {
  let tree = Object.assign( {}, adapter )

  decorator( tree, basePlugins )

  // adapter always overrides the base plugins
  Object.assign( tree, adapter )

  // post-plugins may wrap/tap others, so need to be last
  decorator( tree, postPlugins )

  return tree
}

module.exports = factory
