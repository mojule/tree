'use strict';

var exposeProperties = function exposeProperties(propertyNames) {
  var plugin = function plugin(node) {
    return propertyNames.reduce(function (api, name) {
      api[name] = function () {
        return node.getValue(name);
      };

      return api;
    }, {});
  };

  return plugin;
};

module.exports = exposeProperties;