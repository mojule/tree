'use strict';

var parentMap = function parentMap(tree) {
  var parents = new Map();

  var original = {
    append: tree.append,
    insertBefore: tree.insertBefore,
    remove: tree.remove,
    getParent: tree.getParent
  };

  var append = function append(root, parentNode, childNode) {
    var value = original.append(root, parentNode, childNode);

    parents.set(childNode, parentNode);

    return value;
  };

  var insertBefore = function insertBefore(root, parentNode, childNode, referenceNode) {
    var value = original.insertBefore(root, parentNode, childNode, referenceNode);

    parents.set(childNode, parentNode);

    return value;
  };

  var remove = function remove(root, node) {
    var value = original.remove(root, node);

    parents.set(node, null);

    return value;
  };

  var getParent = function getParent(root, node) {
    var parent = parents.get(node);

    if (!parent && original.getParent) {
      parent = original.getParent(root, node);
      parents.set(node, parent);
    }

    return parent;
  };

  return { append: append, insertBefore: insertBefore, remove: remove, getParent: getParent };
};

parentMap.requirements = ['append', 'insertBefore', 'remove'];

module.exports = parentMap;