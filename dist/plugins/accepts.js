'use strict';

var acceptsNode = function acceptsNode(fn) {
  var accepts = function accepts(fn, node, childNode) {
    return !fn.isEmpty(fn, node);
  };

  accepts.def = {
    argTypes: ['fn', 'node', 'node'],
    returnType: 'boolean',
    require: ['isEmpty'],
    categories: ['node', 'plugin']
  };

  var originalInsertBefore = fn.insertBefore;

  var insertBefore = function insertBefore(fn, root, parentNode, childNode, referenceNode) {
    if (!fn.accepts(fn, parentNode, childNode)) throw new Error('Node cannot accept this child');

    return originalInsertBefore(fn, root, parentNode, childNode, referenceNode);
  };

  insertBefore.def = originalInsertBefore.def;

  return Object.assign(fn, { accepts: accepts, insertBefore: insertBefore });
};

module.exports = acceptsNode;