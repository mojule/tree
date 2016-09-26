"use strict";

module.exports = {
  replaceChild: function replaceChild(fn, root, parentNode, newNode, oldNode) {
    fn.insertBefore(fn, root, parentNode, newNode, oldNode);

    return fn.remove(fn, root, oldNode);
  },
  argTypes: ['fn', 'rootNode', 'node', 'node', 'node'],
  returnType: 'node',
  requires: ['insertBefore', 'remove'],
  categories: ["manipulation"]
};