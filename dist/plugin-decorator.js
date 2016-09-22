'use strict';

var pluginDecorator = function pluginDecorator(obj, plugins) {
  var hasFunction = function hasFunction(fname) {
    return typeof obj[fname] === 'function';
  };

  plugins.forEach(function (plugin) {
    if (Array.isArray(plugin.requirements) && !plugin.requirements.every(hasFunction)) {
      console.log('could not add', plugin.name);
      return;
    }

    Object.assign(obj, plugin(obj));
  });

  return obj;
};

module.exports = pluginDecorator;