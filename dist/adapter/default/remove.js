'use strict';

module.exports = {
    remove: function remove(fn, root, node) {
        var parentNode = fn.getParent(fn, root, node);

        if (!parentNode) return;

        var index = parentNode.children.indexOf(node);

        parentNode.children.splice(index, 1);

        return node;
    },
    argTypes: ['fn', 'rootNode', 'node'],
    returnType: 'node',
    requires: ['getParent'],
    categories: ['manipulation', 'adapter']
};