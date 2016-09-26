'use strict';

module.exports = {
  value: function value(node, _value) {
    if (_value !== undefined) {
      node.value = _value;
    }

    return node.value;
  },
  argTypes: ['node', 'nodeValue?'],
  returnType: 'nodeValue',
  categories: ['manipulation', 'adapter']
};