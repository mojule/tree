'use strict'

const properties = require( './properties' )

const appendChild = require( './manipulation/appendChild' )
const insertAfter = require( './manipulation/insertAfter' )
const insertBefore = require( './manipulation/insertBefore' )
const prependChild = require( './manipulation/prependChild' )
const remove = require( './manipulation/remove' )
const removeAll = require( './manipulation/removeAll' )
const removeChild = require( './manipulation/removeChild' )
const replaceChild = require( './manipulation/replaceChild' )
const unwrap = require( './manipulation/unwrap' )
const wrap = require( './manipulation/wrap' )

const nodes = require( './traversal/nodes' )

const accepts = require( './query/accepts' )
const atPath = require( './query/atPath' )
const depth = require( './query/depth' )
const getPath = require( './query/getPath' )
const index = require( './query/index' )
const isBranch = require( './query/isBranch' )
const isEmpty = require( './query/isEmpty' )
const isLeaf = require( './query/isLeaf' )
const meta = require( './query/meta' )
const nodeName = require( './query/nodeName' )
const root = require( './query/root' )
const slug = require( './query/slug' )

const assign = require( './query/object-value/assign' )
const id = require( './query/object-value/id' )
const objectNodeName = require( './query/object-value/nodeName' )

const serializer = require( './serializer/serialize' )

const clone = require( './functional/clone' )
const map = require( './functional/map' )

module.exports = [
  properties,

  appendChild, insertAfter, insertBefore, prependChild, remove, removeAll,
  removeChild, replaceChild, unwrap, wrap,

  nodes,

  accepts, atPath, depth, getPath, index, isBranch, isEmpty, isLeaf, meta,
  nodeName, root, slug,

  assign, id, objectNodeName,

  serializer,

  clone, map
]
