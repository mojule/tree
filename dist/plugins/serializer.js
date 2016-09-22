'use strict';

var serializer = function serializer(tree) {
  var serialize = function serialize(node) {
    return {
      value: tree.value(node),
      children: tree.getChildren(node).map(serialize)
    };
  };

  var deserialize = function deserialize(obj) {
    var node = tree.createNode(obj.value);

    if (Array.isArray(obj.children)) {
      obj.children.forEach(function (child) {
        tree.append(null, node, deserialize(child));
      });
    }

    return node;
  };

  return { serialize: serialize, deserialize: deserialize };
};

serializer.requirements = ['value', 'getChildren', 'createNode', 'append'];

module.exports = serializer;