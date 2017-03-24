'use strict';

var utils = require('@mojule/utils');

var idModule = function idModule(node, state) {
    var id = function id() {
        var value = node.getValue();

        if (value.id) return value.id;

        var nodeType = node.nodeType();
        var id = utils.id(nodeType);

        value.id = id;

        node.setValue(value);

        return id;
    };

    return { id: id };
};

module.exports = idModule;