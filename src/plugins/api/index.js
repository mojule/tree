'use strict'

const properties = require( './properties' )

const after = require( './manipulation/after' )
const append = require( './manipulation/append' )
const appendChild = require( './manipulation/appendChild' )
const before = require( './manipulation/before' )
const insertAfter = require( './manipulation/insertAfter' )
const insertBefore = require( './manipulation/insertBefore' )
const prepend = require( './manipulation/prepend' )
const prependChild = require( './manipulation/prependChild' )
const remove = require( './manipulation/remove' )
const removeAll = require( './manipulation/removeAll' )
const removeChild = require( './manipulation/removeChild' )
const replaceChild = require( './manipulation/replaceChild' )
const replaceWith = require( './manipulation/replaceWith' )
const unwrap = require( './manipulation/unwrap' )
const wrap = require( './manipulation/wrap' )
const wrapInner = require( './manipulation/wrapInner' )

const nodes = require( './traversal/nodes' )

const accepts = require( './query/accepts' )
const atPath = require( './query/atPath' )
const contains = require( './query/contains' )
const depth = require( './query/depth' )
const getPath = require( './query/getPath' )
const hasChildNodes = require( './query/hasChildNodes' )
const index = require( './query/index' )
const isBranch = require( './query/isBranch' )
const isEmpty = require( './query/isEmpty' )
const isLeaf = require( './query/isLeaf' )
const meta = require( './query/meta' )
const nodeName = require( './query/nodeName' )
const treeName = require( './query/treeName' )
const rootNode = require( './query/rootNode' )
const slug = require( './query/slug' )

const assign = require( './query/object-value/assign' )
const id = require( './query/object-value/id' )
const objectNodeName = require( './query/object-value/nodeName' )

const serializer = require( './serializer/serialize' )

const clone = require( './functional/clone' )
const map = require( './functional/map' )

module.exports = [
  properties,

  after, append, appendChild, before, insertAfter, insertBefore, prepend,
  prependChild, remove, removeAll, removeChild, replaceChild, replaceWith,
  unwrap, wrap, wrapInner,

  nodes,

  accepts, atPath, contains, depth, getPath, hasChildNodes, index, isBranch,
  isEmpty, isLeaf, meta, nodeName, treeName, rootNode, slug,

  assign, id, objectNodeName,

  serializer,

  clone, map
]
