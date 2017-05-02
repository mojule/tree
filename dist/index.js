'use strict';

var TreeFactory = require('@mojule/tree-factory');
var is = require('@mojule/is');
var adapter = require('./adapter');
var defaultPlugins = require('./plugins');
var FactoryFactory = require('./factory-factory');

var defaultOptions = {};

var Factory = FactoryFactory(TreeFactory, defaultPlugins, defaultOptions, adapter);

var Tree = Factory();

Object.assign(Tree, { Factory: Factory, FactoryFactory: FactoryFactory });

module.exports = Tree;