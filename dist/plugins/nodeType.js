'use strict';

var is = require('@mojule/is');

var nodeTypeModule = function nodeTypeModule(node, state) {
  var _nodeType = node.nodeType;


  return {
    nodeType: function nodeType() {
      var fromValue = node.getValue('nodeType');

      if (is.string(fromValue)) return fromValue;

      return _nodeType();
    }
  };
};

module.exports = nodeTypeModule;