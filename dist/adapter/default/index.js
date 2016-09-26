'use strict';

var createNode = require('./createNode');
var getChildren = require('./getChildren');
var insertBefore = require('./insertBefore');
var remove = require('./remove');
var value = require('./value');

module.exports = { createNode: createNode, getChildren: getChildren, insertBefore: insertBefore, remove: remove, value: value };