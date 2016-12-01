'use strict';

var cloneObj = function cloneObj(obj) {
  return JSON.parse(JSON.stringify(obj));
};

var serializer = function serializer(fn) {
  var serialize = function serialize(node) {
    return {
      value: fn.value(node),
      children: fn.getChildren(node).map(serialize)
    };
  };

  serialize.def = {
    argTypes: ['node'],
    returnType: 'object',
    requires: ['value', 'getChildren'],
    categories: ['serializer', 'plugin']
  };

  var deserialize = function deserialize(obj) {
    var parentNode = fn.createNode(obj.value);

    if (Array.isArray(obj.children)) {
      obj.children.forEach(function (child) {
        fn.append(fn, null, parentNode, deserialize(child));
      });
    }

    return parentNode;
  };

  deserialize.def = {
    argTypes: ['object'],
    returnType: 'node',
    requires: ['createNode', 'append'],
    categories: ['serializer', 'plugin']
  };

  var clone = function clone(fn, node) {
    return fn.deserialize(cloneObj(fn.serialize(node)));
  };

  clone.def = {
    argTypes: ['fn', 'node'],
    returnType: 'node',
    requires: ['serialize', 'deserialize'],
    categories: ['clone', 'plugin']
  };

  return Object.assign(fn, { serialize: serialize, deserialize: deserialize, clone: clone });
};

module.exports = serializer;