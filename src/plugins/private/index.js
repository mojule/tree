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
const nextSibling = require( './generators/nextSibling' )
const previousSibling = require( './generators/previousSibling' )
const sibling = require( './generators/sibling' )
const sub = require( './generators/sub' )

module.exports = [
  registerGenerator,

  ancestor, bfs, branch, child, descendant, dfs, inclusiveAncestor,
  inclusiveDescendant, leaf, nextSibling, previousSibling, sibling, sub
]
