'use strict'

const properties = require( './properties' )

const appendChild = require( './manipulation/appendChild' )
const insertAfter = require( './manipulation/insertAfter' )
const insertBefore = require( './manipulation/insertBefore' )
const prependChild = require( './manipulation/prependChild' )
const remove = require( './manipulation/remove' )
const removeAll = require( './manipulation/removeAll' )
const removeChild = require( './manipulation/removeChild' )
const unwrap = require( './manipulation/unwrap' )
const wrap = require( './manipulation/wrap' )

const walk = require( './traversal/walk' )
const nodes = require( './traversal/nodes' )

const accepts = require( './query/accepts' )
const atPath = require( './query/atPath' )
const childAt = require( './query/childAt' )
const depth = require( './query/depth' )
const find = require( './query/find' )
const findAll = require( './query/findAll' )
const getPath = require( './query/getPath' )
const has = require( './query/has' )
const index = require( './query/index' )
const isEmpty = require( './query/isEmpty' )
const isLeaf = require( './query/isLeaf' )
const root = require( './query/root' )
const slug = require( './query/slug' )

const serializer = require( './serializer/serialize' )

const clone = require( './functional/clone' )
const map = require( './functional/map' )

module.exports = [
  properties,

  appendChild, insertAfter, insertBefore, prependChild, remove, removeAll,
  removeChild, unwrap, wrap,

  walk, nodes,

  accepts, atPath, childAt, depth, find, findAll, getPath, has, index, isEmpty,
  isLeaf, root, slug,

  serializer,

  clone, map
]
