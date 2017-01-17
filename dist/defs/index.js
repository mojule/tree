'use strict';

var append = require('./manipulation/append');
var empty = require('./manipulation/empty');
var insertAfter = require('./manipulation/insertAfter');
var insertAt = require('./manipulation/insertAt');
var prepend = require('./manipulation/prepend');
var removeAt = require('./manipulation/removeAt');
var replaceChild = require('./manipulation/replaceChild');
var unwrap = require('./manipulation/unwrap');
var wrap = require('./manipulation/wrap');

var ancestors = require('./traversal/ancestors');
var childAt = require('./traversal/childAt');
var closest = require('./traversal/closest');
var contains = require('./traversal/contains');
var descendents = require('./traversal/descendents');
var find = require('./traversal/find');
var findAll = require('./traversal/findAll');
var firstChild = require('./traversal/firstChild');
var getParent = require('./traversal/getParent');
var hasChildren = require('./traversal/hasChildren');
var isEmpty = require('./traversal/isEmpty');
var lastChild = require('./traversal/lastChild');
var nextSibling = require('./traversal/nextSibling');
var previousSibling = require('./traversal/previousSibling');
var siblings = require('./traversal/siblings');
var walk = require('./traversal/walk');
var walkUp = require('./traversal/walkUp');

var createNode = require('./adapter/createNode');
var getChildren = require('./adapter/getChildren');
var insertBefore = require('./adapter/insertBefore');
var remove = require('./adapter/remove');
var value = require('./adapter/value');

module.exports = {
  append: append, empty: empty, insertAfter: insertAfter, insertAt: insertAt, prepend: prepend, removeAt: removeAt, replaceChild: replaceChild,
  unwrap: unwrap, wrap: wrap, ancestors: ancestors, childAt: childAt, closest: closest, contains: contains, descendents: descendents, find: find,
  findAll: findAll, firstChild: firstChild, getParent: getParent, hasChildren: hasChildren, isEmpty: isEmpty, lastChild: lastChild, nextSibling: nextSibling,
  previousSibling: previousSibling, siblings: siblings, walk: walk, walkUp: walkUp, createNode: createNode, getChildren: getChildren,
  insertBefore: insertBefore, remove: remove, value: value
};