'use strict';

var manipulation = function manipulation(tree) {
  var replaceChild = function replaceChild(root, parentNode, newNode, oldNode) {
    tree.insertBefore(root, parentNode, newNode, oldNode);

    return tree.remove(root, oldNode);
  };

  var insertAt = function insertAt(root, parentNode, childNode, index) {
    var children = tree.getChildren(parentNode);
    var referenceNode = children[index];

    return tree.insertBefore(root, parentNode, childNode, referenceNode);
  };

  var insertAfter = function insertAfter(root, parentNode, childNode, referenceNode) {
    var children = tree.getChildren(parentNode);
    var referenceIndex = children.indexOf(referenceNode);
    var beforeNode = children[referenceIndex + 1];

    return tree.insertBefore(root, parentNode, childNode, beforeNode);
  };

  var removeAt = function removeAt(root, parentNode, index) {
    var children = tree.getChildren(parentNode);
    var childNode = children[index];

    return tree.remove(root, childNode);
  };

  var empty = function empty(root, parentNode) {
    var result = [];

    var children = tree.getChildren(parentNode).slice();

    children.forEach(function (node) {
      return result.push(tree.remove(parentNode, node));
    });

    return result;
  };

  var prepend = function prepend(root, parentNode, childNode) {
    var children = tree.getChildren(parentNode);

    if (children.length) {
      return tree.insertBefore(root, parentNode, childNode, children[0]);
    } else {
      return tree.append(root, parentNode, childNode);
    }
  };

  var unwrap = function unwrap(root, node) {
    var parent = tree.getParent(root, node);
    var grandparent = tree.getParent(root, parent);
    var children = tree.getChildren(parent);

    children.forEach(function (child) {
      tree.insertBefore(root, grandparent, child, parent);
    });

    return tree.remove(root, parent);
  };

  var wrap = function wrap(root, node, newNode) {
    var parent = tree.getParent(root, node);

    tree.insertBefore(root, parent, newNode, node);
    tree.append(root, newNode, node);

    return newNode;
  };

  return {
    replaceChild: replaceChild, insertAt: insertAt, insertAfter: insertAfter, removeAt: removeAt, empty: empty, prepend: prepend, unwrap: unwrap, wrap: wrap
  };
};

manipulation.requirements = ['insertBefore', 'append', 'remove', 'getChildren', 'getParent'];

module.exports = manipulation;