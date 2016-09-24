'use strict'

const fnFactory = fnDefs => {
  const fnames = Object.keys( fnDefs )

  const makeFn = name => {
    const fnDef = fnDefs[ name ]
    const fn = fnDef[ name ]
    const def = Object.assign( {}, fnDef )

    delete def[ name ]

    return Object.assign( fn, { def } )
  }

  const fns = fnames.reduce( ( fns, name ) => {
    fns[ name ] = makeFn( name )

    return fns
  }, {} )

  return fns
}

module.exports = fnFactory
