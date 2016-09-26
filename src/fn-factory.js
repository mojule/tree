'use strict'

const baseDefs = require( './defs' )

const mapper = defs => {
  const makeFn = name => {
    const fnDef = defs[ name ]
    const fn = fnDef[ name ]

    fn.def = fnDef

    return fn
  }

  const fnames = Object.keys( defs )

  return fnames.reduce( ( fns, name ) => {
    fns[ name ] = makeFn( name )

    return fns
  }, {} )
}

const fnFactory = adapter => {
  const adapterDefs = Object.keys( adapter ).reduce( ( defs, fname ) => {
    let adapterDef = adapter[ fname ]

    if( typeof adapterDef === 'function' ){
      const fn = adapterDef
      adapterDef = adapterDef.def || baseDefs[ fname ] || {}
      adapterDef[ fname ] = fn
    }

    defs[ fname ] = adapterDef

    return defs
  }, {} )

  return mapper( Object.assign( {}, baseDefs, adapterDefs ) )
}

module.exports = fnFactory
