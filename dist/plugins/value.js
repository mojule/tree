'use strict';

var is = require('@mojule/is');

var valueModule = function valueModule(node, state) {
  var _getValue = node.getValue,
      _setValue = node.setValue,
      value = node.value;


  return {
    getValue: function getValue(propertyName) {
      if (is.undefined(propertyName)) return _getValue();

      var value = _getValue();

      return value[propertyName];
    },
    setValue: function setValue(arg, propertyValue) {
      if (is.object(arg)) return _setValue(arg);

      var existing = _getValue();

      existing[arg] = propertyValue;

      return _setValue(existing);
    },
    assign: function assign(value) {
      var existing = _getValue();

      return _setValue(Object.assign({}, existing, value));
    }
  };
};

module.exports = valueModule;