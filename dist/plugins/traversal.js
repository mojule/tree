'use strict';

var traversal = function traversal(tree) {
  var walk = function walk(node, callback) {
    var current = void 0,
        parent = void 0,
        depth = void 0,
        i = void 0,
        children = void 0,
        stop = void 0;
    var nodes = [node];
    var parents = [null];
    var depths = [0];

    while (nodes.length) {
      current = nodes.pop();
      parent = parents.pop();
      depth = depths.pop();

      stop = callback(current, parent, depth);

      if (stop) break;

      children = tree.getChildren(current);

      for (i = children.length - 1; i >= 0; i--) {
        nodes.push(children[i]);
        parents.push(current);
        depths.push(depth + 1);
      }
    }
  };

  var walkUp = function walkUp(root, node, callback) {
    var stop = callback(node);

    if (!stop) {
      var parent = tree.getParent(root, node);
      while (parent && !stop) {
        stop = callback(parent);
        if (!stop) parent = tree.getParent(root, parent);
      }
    }
  };

  var find = function find(node, predicate) {
    var targetNode = void 0;

    walk(node, function (currentNode) {
      if (predicate(currentNode)) {
        targetNode = currentNode;

        return true;
      }
    });

    return targetNode;
  };

  var getParent = function getParent(root, node) {
    return find(root, function (currentNode) {
      return tree.getChildren(currentNode).includes(node);
    });
  };

  var childAt = function childAt(node, i) {
    return tree.getChildren(node)[i];
  };

  var firstChild = function firstChild(node) {
    return tree.getChildren(node)[0];
  };

  var lastChild = function lastChild(node) {
    var children = tree.getChildren(node);

    return children[children.length - 1];
  };

  var nextSibling = function nextSibling(root, node) {
    var parent = tree.getParent(root, node);
    var children = tree.getChildren(parent);

    var index = children.indexOf(node);

    return children[index + 1];
  };

  var previousSibling = function previousSibling(root, node) {
    var parent = tree.getParent(root, node);
    var children = tree.getChildren(parent);

    var index = children.indexOf(node);

    return children[index - 1];
  };

  var closest = function closest(root, node, predicate) {
    var targetNode = void 0;

    walkUp(root, node, function (currentNode) {
      if (predicate(currentNode)) {
        targetNode = currentNode;

        return true;
      }
    });

    return targetNode;
  };

  var ancestors = function ancestors(root, node) {
    var parentNodes = [];

    var parent = tree.getParent(root, node);

    if (parent) walkUp(root, parent, function (n) {
      parentNodes.push(n);
    });

    return parentNodes;
  };

  var siblings = function siblings(root, node) {
    var parent = tree.getParent(root, node);
    var children = tree.getChildren(parent);

    return children.filter(function (child) {
      return child !== node;
    });
  };

  var findAll = function findAll(node, predicate) {
    var nodes = [];

    tree.walk(node, function (currentNode) {
      if (predicate(currentNode)) {
        nodes.push(currentNode);
      }
    });

    return nodes;
  };

  var descendents = function descendents(node) {
    return findAll(node, function (n) {
      return n !== node;
    });
  };

  var contains = function contains(node, predicate) {
    return !!find(node, predicate);
  };

  var hasChildren = function hasChildren(node) {
    return tree.getChildren(node).length > 0;
  };

  return {
    walk: walk, find: find, getParent: getParent, childAt: childAt, firstChild: firstChild, lastChild: lastChild, nextSibling: nextSibling,
    previousSibling: previousSibling, closest: closest, ancestors: ancestors, siblings: siblings, descendents: descendents, findAll: findAll,
    contains: contains, hasChildren: hasChildren
  };
};

traversal.requirements = ['getChildren'];

module.exports = traversal;