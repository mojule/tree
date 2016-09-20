'use strict'

const nodeToNodeList = nodeCount => ({
  argType: 'node',
  returnType: 'nodeList',
  extraNodeArgs: nodeCount || 0
})

const nodeCallback = () => ({ argType: 'callback' })

const rootCallback = () => ({ argType: 'rootCallback' })

const nodePredicate = () => ({
  argType: 'nodePredicate'
})

const nodePredicateToNode = () => ({
  argType: 'nodePredicate',
  returnType: 'node'
})

const nodePredicateToNodeList = () => ({
  argType: 'nodePredicate',
  returnType: 'nodeList'
})

const rootPredicateToNode = () => ({
  argType: 'rootPredicate',
  returnType: 'node'
})

const rootPredicateToNodeList = () => ({
  argType: 'rootPredicate',
  returnType: 'nodeList'
})

const nodeToNode = nodeCount => ({
  argType: 'node',
  returnType: 'node',
  extraNodeArgs: nodeCount || 0
})

const rootToNode = nodeCount => ({
  argType: 'root',
  returnType: 'node',
  extraNodeArgs: nodeCount || 0
})

const rootToNodeList = nodeCount => ({
  argType: 'root',
  returnType: 'nodeList',
  extraNodeArgs: nodeCount || 0
})

const node = () => ({ argType: 'node' })

const toNode = () => ({ returnType: 'node' })

const fnDefs = {
  getChildren: nodeToNodeList(),
  childAt: nodeToNode(),
  firstChild: nodeToNode(),
  lastChild: nodeToNode(),
  walk: nodeCallback(),
  walkUp: rootCallback(),
  find: nodePredicateToNode(),
  findAll: nodePredicateToNodeList(),
  getParent: rootToNode(),
  closest: rootPredicateToNode(),
  ancestors: rootToNodeList(),
  nextSibling: rootToNode(),
  previousSibling: rootToNode(),
  siblings: rootToNodeList(),
  descendents: nodeToNodeList(),
  contains: nodePredicate(),
  hasChildren: node(),
  value: node(),
  createNode: toNode(),
  append: rootToNode( 1 ),
  insertBefore: rootToNode( 2 ),
  remove: rootToNode(),
  replaceChild: rootToNode( 2 ),
  insertAt: rootToNode( 1 ),
  insertAfter: rootToNode( 2 ),
  removeAt: rootToNode(),
  empty: rootToNodeList(),
  prepend: rootToNode( 1 ),
  unwrap: rootToNode(),
  wrap: rootToNode( 1 ),
  serialize: node(),
  deserialize: toNode()
}

module.exports = fnDefs
