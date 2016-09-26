'use strict';

var baseDefs = require('./defs');

var mapper = function mapper(defs) {
  var makeFn = function makeFn(name) {
    var fnDef = defs[name];
    var fn = fnDef[name];

    fn.def = fnDef;

    return fn;
  };

  var fnames = Object.keys(defs);

  return fnames.reduce(function (fns, name) {
    fns[name] = makeFn(name);

    return fns;
  }, {});
};

var fnFactory = function fnFactory(adapter) {
  var adapterDefs = Object.keys(adapter).reduce(function (defs, fname) {
    var adapterDef = adapter[fname];

    if (typeof adapterDef === 'function') {
      var fn = adapterDef;
      adapterDef = adapterDef.def || baseDefs[fname] || {};
      adapterDef[fname] = fn;
    }

    defs[fname] = adapterDef;

    return defs;
  }, {});

  return mapper(Object.assign({}, baseDefs, adapterDefs));
};

module.exports = fnFactory;