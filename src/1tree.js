'use strict'

require( './polyfills' )

const adapter = require( './adapter-factory' )
const plugin = require( './plugin-decorator' )
const defaultFactory = require( './default' )

// functions for the default tree implementation
const fn = defaultFactory()

const tree = value => fn.api( fn.createNode( value ) )

Object.assign( tree, fn, { adapter, plugin } )

module.exports = tree
