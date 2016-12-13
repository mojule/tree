'use strict'

const append = require( './manipulation/append' )
const empty = require( './manipulation/empty' )
const insertAfter = require( './manipulation/insertAfter' )
const insertAt = require( './manipulation/insertAt' )
const prepend = require( './manipulation/prepend' )
const removeAt = require( './manipulation/removeAt' )
const replaceChild = require( './manipulation/replaceChild' )
const unwrap = require( './manipulation/unwrap' )
const wrap = require( './manipulation/wrap' )

const ancestors = require( './traversal/ancestors' )
const childAt = require( './traversal/childAt' )
const closest = require( './traversal/closest' )
const contains = require( './traversal/contains' )
const descendents = require( './traversal/descendents' )
const find = require( './traversal/find' )
const findAll = require( './traversal/findAll' )
const firstChild = require( './traversal/firstChild' )
const getParent = require( './traversal/getParent' )
const hasChildren = require( './traversal/hasChildren' )
const isEmpty = require( './traversal/isEmpty' )
const lastChild = require( './traversal/lastChild' )
const nextSibling = require( './traversal/nextSibling' )
const previousSibling = require( './traversal/previousSibling' )
const siblings = require( './traversal/siblings' )
const walk = require( './traversal/walk' )
const walkUp = require( './traversal/walkUp' )

const createNode = require( './adapter/createNode' )
const getChildren = require( './adapter/getChildren' )
const insertBefore = require( './adapter/insertBefore' )
const remove = require( './adapter/remove' )
const value = require( './adapter/value' )

module.exports = {
  append, empty, insertAfter, insertAt, prepend, removeAt, replaceChild,
  unwrap, wrap, ancestors, childAt, closest, contains, descendents, find,
  findAll, firstChild, getParent, hasChildren, isEmpty, lastChild, nextSibling,
  previousSibling, siblings, walk, walkUp, createNode, getChildren,
  insertBefore, remove, value
}
