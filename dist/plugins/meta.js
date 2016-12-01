'use strict';

/*
  Get/set runtime data for nodes that aren't written to the nodes themselves

  For example, when visualising trees you might want to allow the user to
  collapse or expand nodes for the duration of the session, but not actually
  modify the nodes themselves
*/

var metaPlugin = function metaPlugin(fn) {
  var metaMap = new Map();

  var meta = function meta(fn, node, key, value) {
    if (!metaMap.has(node)) {
      metaMap.set(node, {});
    }

    var obj = metaMap.get(node);

    if (value !== undefined) {
      obj[key] = value;
    }

    return obj[key];
  };

  meta.def = {
    argTypes: ['fn', 'node', 'string', 'any'],
    returnType: 'any',
    requires: [],
    categories: ['meta', 'plugin']
  };

  return Object.assign(fn, { meta: meta });
};

module.exports = metaPlugin;