'use strict';

module.exports = {
  getPath: function getPath(fn, root, node) {
    var separator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '/';

    if (root === node) return separator;

    var slugs = [];

    fn.walkUp(fn, root, node, function (n) {
      var slug = fn.slug(fn, root, n);

      if (slug.includes(separator)) {
        var message = 'Node slugs should not contain the separator string "' + separator + '"';

        throw new Error(message);
      }

      slugs.unshift(slug);
    });

    return slugs.join(separator);
  },
  argTypes: ['fn', 'rootNode', 'node', 'string'],
  returnType: 'string',
  requires: ['walkUp', 'slug'],
  categories: ['traversal']
};