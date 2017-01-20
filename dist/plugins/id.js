'use strict';

var utils = require('mojule-utils');

var lazyId = function lazyId(fn) {
  var id = function id(fn, node) {
    var value = fn.value(node);

    if (value._id) return value._id;

    var nodeType = fn.nodeType(node);
    var id = utils.id(nodeType);

    value._id = id;

    fn.value(node, value);

    return id;
  };

  id.def = {
    argTypes: ['fn', 'node'],
    returnType: 'string',
    require: ['value', 'nodeType'],
    categories: ['node', 'plugin']
  };

  return Object.assign(fn, { id: id });
};

module.exports = lazyId;