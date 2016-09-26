'use strict';

var parentMap = function parentMap(fn) {
  var parents = new Map();

  var original = {
    insertBefore: fn.insertBefore,
    remove: fn.remove,
    getParent: fn.getParent
  };

  var insertBefore = function insertBefore(fn, root, parentNode, childNode, referenceNode) {
    var value = original.insertBefore(fn, root, parentNode, childNode, referenceNode);

    parents.set(childNode, parentNode);

    return value;
  };

  var remove = function remove(fn, root, node) {
    var value = original.remove(fn, root, node);

    parents.set(node, null);

    return value;
  };

  var getParent = function getParent(fn, root, node) {
    var parent = parents.get(node);

    if (!parent && original.getParent) {
      parent = original.getParent(fn, root, node);
      parents.set(node, parent);
    }

    return parent;
  };

  var wrapped = { insertBefore: insertBefore, remove: remove, getParent: getParent };

  Object.keys(wrapped).forEach(function (fname) {
    wrapped[fname].def = Object.assign({
      wraps: original[fname]
    }, original[fname].def);

    wrapped[fname].def.categories.push('parentMap', 'plugin');
  });

  return Object.assign(fn, wrapped);
};

module.exports = parentMap;