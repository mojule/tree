'use strict'

const HierarchyError = ( parent, child ) => Error(
  `Parent ${ parent } cannot accept child ${ child }`
)

module.exports = HierarchyError
