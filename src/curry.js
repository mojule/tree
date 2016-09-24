'use strict'

const cloneObjectOfArray = Object.keys( obj ).reduce( ( clone, key ) => {
  clone[ key ] = obj[ key ].slice()

  return clone
}, {} )

const curry = ( fn, argTypes, state ) => {
  argTypes = argTypes || []
  state = state ? cloneObjectOfArray( state ) : {}

  const getStateValue = argType => state[ argType ].shift()
  const stateArgs = argTypes.map( getStateValue ) 

  return ( ...args ) => fn( ...stateArgs.concat( args ) )
}

module.exports = curry
