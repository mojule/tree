'use strict'

// mapper( fnDefs:Object[FnDef] ) => Object[Function]
const mapper = fnDefs => {
  // makeFn( name:String ) => Function
  const makeFn = name => {
    const fnDef = fnDefs[ name ]
    const fn = fnDef[ name ]

    fn.def = fnDef

    return fn
  }

  const fnames = Object.keys( fnDefs )

  return fnames.reduce( ( fns, name ) => {
    fns[ name ] = makeFn( name )

    return fns
  }, {} )
}

module.exports = mapper
