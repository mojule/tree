'use strict';

var getNodeType = function getNodeType(fn) {
  var nodeType = function nodeType(fn, node) {
    var value = fn.value(node);

    if (typeof value.nodeType === 'string' && value.nodeType.length > 0) return value.nodeType;

    return 'treeNode';
  };

  nodeType.def = {
    argTypes: ['fn', 'node'],
    returnType: 'string',
    require: ['value'],
    categories: ['node', 'plugin']
  };

  return Object.assign(fn, { nodeType: nodeType });
};

module.exports = getNodeType;