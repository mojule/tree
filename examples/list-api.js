'use strict'

const is = require( '@mojule/is' )
const Tree = require( '../' )

const node = Tree( { nodeName: 'element' } )

const pad = ( str, length = 30 ) => {
  while( str.length < length )
    str += ' '

  return str
}

const logKeys = obj => {
  Object.keys( obj ).forEach( key => {
    console.log( pad( key ), is.of( obj[ key ] ) )
  })
}

console.log( 'Tree API (statics)' )
console.log( '---' )
logKeys( Tree )

console.log()

console.log( 'node API (instance)' )
console.log( '---' )
logKeys( node )

