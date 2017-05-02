'use strict';

var exposeProperties = require('./expose-properties');
var is = require('@mojule/is');

var FactoryFactory = function FactoryFactory(BaseFactory) {
  var defaultPlugins = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var defaultOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var adapter = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  var Factory = function Factory() {
    for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
      plugins[_key] = arguments[_key];
    }

    var options = {};

    if (plugins.length > 0 && is.object(plugins[plugins.length - 1])) options = plugins.pop();

    options = Object.assign({}, defaultOptions, options);

    if (plugins.length === 1 && is.array(plugins[0])) plugins = plugins[0];

    plugins = defaultPlugins.concat(plugins);

    if (is.array(options.exposeProperties)) {
      plugins.push(exposeProperties(options.exposeProperties));
    }

    if (!is.null(adapter)) return BaseFactory(adapter, plugins, options);

    return BaseFactory(plugins, options);
  };

  return Factory;
};

module.exports = FactoryFactory;