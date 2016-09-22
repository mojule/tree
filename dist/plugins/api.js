'use strict';

var fnDefs = require('../fn-defs');

var wrapFn = function wrapFn(fn, def, _root, currentNode, wrapNode) {
  var unwrapNodes = function unwrapNodes(args, count) {
    for (var i = 0; i < count; i++) {
      args[i] = args[i].get();
    }
  };

  var setArgs = {
    node: function node(args, count) {
      unwrapNodes(args, count);

      return [currentNode].concat(args);
    },

    root: function root(args, count) {
      unwrapNodes(args, count);

      return [_root, currentNode].concat(args);
    },

    callback: function callback(args) {
      var cb = args[0];

      var wrapped = function wrapped() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args[0] = wrapNode(args[0]);

        if (args[1]) args[1] = wrapNode(args[1]);

        return cb.apply(cb, args);
      };

      args[0] = wrapped;

      return [currentNode].concat(args);
    },

    rootCallback: function rootCallback(args) {
      var cb = args[0];

      var wrapped = function wrapped() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args[0] = wrapNode(args[0]);

        if (args[1]) args[1] = wrapNode(args[1]);

        return cb.apply(cb, args);
      };

      args[0] = wrapped;

      return [_root, currentNode].concat(args);
    },

    nodePredicate: function nodePredicate(args) {
      var predicate = args[0];

      args[0] = function (node) {
        return predicate(wrapNode(node));
      };

      return [currentNode].concat(args);
    },

    rootPredicate: function rootPredicate(args) {
      var predicate = args[0];

      args[0] = function (node) {
        return predicate(wrapNode(node));
      };

      return [_root, currentNode].concat(args);
    },

    default: function _default(args) {
      return args;
    }
  };

  var setResult = {
    node: function node(result) {
      return wrapNode(result);
    },
    nodeList: function nodeList(result) {
      return result.map(wrapNode);
    },
    default: function _default(result) {
      return result;
    }
  };

  var wrapped = function wrapped() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    var argType = def.argType || 'default';
    var count = def.extraNodeArgs || 0;
    var resultType = def.returnType || 'default';

    var fnArgs = setArgs[argType](args, count);
    var result = fn.apply(fn, fnArgs);

    return setResult[resultType](result);
  };

  return wrapped;
};

var apiPlugin = function apiPlugin(tree) {
  var api = function api(root, defs) {
    defs = defs || fnDefs;

    var memo = new Map();

    var wrapNode = function wrapNode(node) {
      if (memo.has(node)) return memo.get(node);

      var api = Object.keys(tree).reduce(function (api, key) {
        var fn = tree[key];

        // if current fn is in defs wrap else pass through untouched
        api[key] = defs[key] ? wrapFn(fn, defs[key], root, node, wrapNode) : fn;

        return api;
      }, {});

      // get underlying node
      api.get = function () {
        return node;
      };
      api.getRoot = function () {
        return wrapNode(root);
      };

      memo.set(node, api);

      return api;
    };

    return wrapNode(root);
  };

  return { api: api };
};

apiPlugin.requirements = ['createNode'];

module.exports = apiPlugin;