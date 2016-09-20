'use strict'

require( './polyfills' )

const adapter = require( './src/adapter-factory' )
const plugin = require( './src/plugin-decorator' )
const defaultFactory = require( './src/default' )

// functions for the default tree implementation
const fn = defaultFactory()

const tree = value => fn.api( fn.createNode( value ) )

Object.assign( tree, fn, { adapter, plugin } )

module.exports = tree
