'use strict';

module.exports = {
  atPath: function atPath(fn, root, path) {
    var separator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';

    var node = root;

    var slugs = path.split(separator).filter(function (s) {
      return s !== '';
    });

    slugs.forEach(function (slug) {
      if (!node) {
        throw new Error('Bad path "' + path + '"');
      }

      var children = fn.getChildren(node);

      node = children.find(function (childNode) {
        return fn.slug(fn, root, childNode) === slug;
      });
    });

    return node;
  },
  argTypes: ['fn', 'rootNode', 'string', 'string'],
  returnType: 'node',
  requires: ['walkUp', 'slug'],
  categories: ['traversal']
};