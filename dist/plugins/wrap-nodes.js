'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = require('mojule-utils');
var clone = utils.clone;


var signatureToDef = function signatureToDef(sig) {
  var segs = sig.split('=>');
  var argTypes = segs[0].replace('(', '').replace(')', '').split(',').map(function (arg) {
    return arg.trim();
  });
  var returnType = segs[1].trim();

  return { argTypes: argTypes, returnType: returnType };
};

var argsMap = function argsMap(fn, argTypes, map) {
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var wrappedArgs = argTypes.map(function (typeName, i) {
      var value = args[i];

      if (map[typeName]) {
        return map[typeName](value);
      }

      return value;
    });

    return fn.apply(undefined, _toConsumableArray(wrappedArgs));
  };
};

var wrapNodes = function wrapNodes(_fn) {
  var fnames = Object.keys(_fn);

  var wrappedFn = function wrappedFn(root, _node, fname) {
    return function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var func = _fn[fname];
      var def = func.def || {};
      var argTypes = def && Array.isArray(def.argTypes) ? def.argTypes : [];

      var firstNode = false;

      var curryMap = {
        fn: function fn() {
          return _fn;
        },
        rootNode: function rootNode() {
          return root;
        },
        node: function node() {
          if (!firstNode) {
            firstNode = true;
            return _node;
          }

          return args.shift().get();
        },
        any: function any() {
          return args.shift();
        }
      };

      var argMap = {
        rootNode: function rootNode(n) {
          return wrappedNode(root, n);
        },
        node: function node(n) {
          return wrappedNode(root, n);
        }
      };

      var curried = [];

      var valuesForArgType = function valuesForArgType(t) {
        if (curryMap[t]) return [curryMap[t]()];

        if (t.indexOf('...') !== -1) {
          var restType = t.split('...').filter(function (seg) {
            return seg.trim() !== '';
          }).join('');

          if (restType === 'fn' || restType === 'rootNode') throw new Error('Cannot use fn or rootNode as a rest parameter type in argTypes');

          var restValues = [];

          while (args.length) {
            restValues.push.apply(restValues, _toConsumableArray(valuesForArgType(restType)));
          }return restValues;
        }

        if (t.indexOf('=>') !== -1) {
          var _def = signatureToDef(t);
          var fnArg = args.shift();

          return [argsMap(fnArg, _def.argTypes, argMap)];
        }

        return [curryMap.any()];
      };

      argTypes.forEach(function (t) {
        var values = valuesForArgType(t);
        curried.push.apply(curried, _toConsumableArray(values));
      });

      var result = func.apply(undefined, curried);

      if (def.returnType === 'node') {
        result = wrappedNode(root, result);
      } else if (def.returnType === '[node]') {
        result = result.map(function (n) {
          return wrappedNode(root, n);
        });
      }

      return result;
    };
  };

  var wrappedNode = function wrappedNode(root, node) {
    if (node === null || node === undefined) return node;

    var wrapped = fnames.reduce(function (wrappedNode, fname) {
      wrappedNode[fname] = wrappedFn(root, node, fname);

      return wrappedNode;
    }, {});

    wrapped.get = function () {
      return node;
    };
    wrapped.getRoot = function () {
      return root;
    };

    // assist with debugging
    Object.defineProperty(wrapped, '_value', {
      get: function get() {
        return clone(_fn.value(node));
      }
    });
    Object.defineProperty(wrapped, '_children', {
      get: function get() {
        return clone(_fn.getChildren(node));
      }
    });

    return wrapped;
  };

  var createTree = function createTree(root) {
    return wrappedNode(root, root);
  };

  createTree.def = {
    argTypes: ['nodeValue'],
    returnType: 'wrappedNode',
    requires: ['createNode'],
    categories: ['wrapped-nodes', 'plugin']
  };

  return Object.assign(_fn, { createTree: createTree });
};

module.exports = wrapNodes;