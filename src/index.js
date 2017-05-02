'use strict'

const TreeFactory = require( '@mojule/tree-factory' )
const is = require( '@mojule/is' )
const adapter = require( './adapter' )
const defaultPlugins = require( './plugins' )
const FactoryFactory = require( './factory-factory' )

const defaultOptions = {}

const Factory = FactoryFactory( TreeFactory, defaultPlugins, defaultOptions, adapter )

const Tree = Factory()

Object.assign( Tree, { Factory, FactoryFactory } )

module.exports = Tree
