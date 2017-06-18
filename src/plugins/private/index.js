'use strict'

const registerGenerator = require( './generators/registerGenerator' )
const ancestor = require( './generators/ancestor' )
const bfs = require( './generators/bfs' )
const branch = require( './generators/branch' )
const child = require( './generators/child' )
const descendant = require( './generators/descendant' )
const dfs = require( './generators/dfs' )
const inclusiveAncestor = require( './generators/inclusiveAncestor' )
const inclusiveDescendant = require( './generators/inclusiveDescendant' )
const leaf = require( './generators/leaf' )
const sibling = require( './generators/sibling' )

const nodeList = require( './nodeList' )
const entries = require( './nodeList/entries' )
const every = require( './nodeList/every' )
const filter = require( './nodeList/filter' )
const find = require( './nodeList/find' )
const findIndex = require( './nodeList/findIndex' )
const forEach = require( './nodeList/forEach' )
const includes = require( './nodeList/includes' )
const indexOf = require( './nodeList/indexOf' )
const item = require( './nodeList/item' )
const keys = require( './nodeList/keys' )
const length = require( './nodeList/length' )
const map = require( './nodeList/map' )
const reduce = require( './nodeList/reduce' )
const slice = require( './nodeList/slice' )
const some = require( './nodeList/some' )
const values = require( './nodeList/values' )

module.exports = [
  registerGenerator,

  ancestor, bfs, branch, child, descendant, dfs, inclusiveAncestor,
  inclusiveDescendant, leaf, sibling,

  nodeList, entries, every, filter, find, findIndex, forEach, includes, indexOf,
  item, keys, length, map, reduce, slice, some, values
]
