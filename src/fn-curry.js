'use strict'

const curry = fn => {
  const fnames = Object.keys( fn )

  const curried = {}

  return fnames.reduce( ( curried, fname ) => {
    const uncurriedFn = fn[ fname ]
    const def = uncurriedFn.def

    if( def && Array.isArray( def.argTypes ) && def.argTypes[ 0 ] === 'fn' ){
      curried[ fname ] = ( ...args ) => uncurriedFn( curried, ...args )

      curried.def = Object.assign( {}, def, {
        argTypes: def.argTypes.slice( 1 )
      })
    } else {
      curried[ fname ] = uncurriedFn
    }

    return curried
  }, curried )
}

module.exports = curry
