'use strict';

var nodeToNodeList = function nodeToNodeList(nodeCount) {
  return {
    argType: 'node',
    returnType: 'nodeList',
    extraNodeArgs: nodeCount || 0
  };
};

var nodeCallback = function nodeCallback() {
  return { argType: 'callback' };
};

var rootCallback = function rootCallback() {
  return { argType: 'rootCallback' };
};

var nodePredicate = function nodePredicate() {
  return {
    argType: 'nodePredicate'
  };
};

var nodePredicateToNode = function nodePredicateToNode() {
  return {
    argType: 'nodePredicate',
    returnType: 'node'
  };
};

var nodePredicateToNodeList = function nodePredicateToNodeList() {
  return {
    argType: 'nodePredicate',
    returnType: 'nodeList'
  };
};

var rootPredicateToNode = function rootPredicateToNode() {
  return {
    argType: 'rootPredicate',
    returnType: 'node'
  };
};

var rootPredicateToNodeList = function rootPredicateToNodeList() {
  return {
    argType: 'rootPredicate',
    returnType: 'nodeList'
  };
};

var nodeToNode = function nodeToNode(nodeCount) {
  return {
    argType: 'node',
    returnType: 'node',
    extraNodeArgs: nodeCount || 0
  };
};

var rootToNode = function rootToNode(nodeCount) {
  return {
    argType: 'root',
    returnType: 'node',
    extraNodeArgs: nodeCount || 0
  };
};

var rootToNodeList = function rootToNodeList(nodeCount) {
  return {
    argType: 'root',
    returnType: 'nodeList',
    extraNodeArgs: nodeCount || 0
  };
};

var node = function node() {
  return { argType: 'node' };
};

var toNode = function toNode() {
  return { returnType: 'node' };
};

var fnDefs = {
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
  append: rootToNode(1),
  insertBefore: rootToNode(2),
  remove: rootToNode(),
  replaceChild: rootToNode(2),
  insertAt: rootToNode(1),
  insertAfter: rootToNode(2),
  removeAt: rootToNode(),
  empty: rootToNodeList(),
  prepend: rootToNode(1),
  unwrap: rootToNode(),
  wrap: rootToNode(1),
  serialize: node(),
  deserialize: toNode()
};

module.exports = fnDefs;