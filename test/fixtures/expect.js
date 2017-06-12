'use strict'

const assert = require( 'assert' )

const expectProperty = ( name, key, node, expect ) =>
  it( `${ name } has correct ${ key }`, () => {
    assert.strictEqual( node[ key ], expect )
  })

const expectDisconnected = root => {
  expectProperty( 'root', 'parentNode', root, undefined )
  expectProperty( 'root', 'previousSibling', root, undefined )
  expectProperty( 'root', 'nextSibling', root, undefined )
  expectProperty( 'root', 'firstChild', root, undefined )
  expectProperty( 'root', 'lastChild', root, undefined )
}

const expectOneChild = ( root, first ) => {
  expectProperty( 'root', 'parentNode', root, undefined )
  expectProperty( 'root', 'previousSibling', root, undefined )
  expectProperty( 'root', 'nextSibling', root, undefined )
  expectProperty( 'root', 'firstChild', root, first )
  expectProperty( 'root', 'lastChild', root, first )

  expectProperty( 'first', 'parentNode', first, root )
  expectProperty( 'first', 'previousSibling', first, undefined )
  expectProperty( 'first', 'nextSibling', first, undefined )
  expectProperty( 'first', 'firstChild', first, undefined )
  expectProperty( 'first', 'lastChild', first, undefined )
}

const expectTwoChildren = ( root, first, last ) => {
  expectProperty( 'root', 'parentNode', root, undefined )
  expectProperty( 'root', 'previousSibling', root, undefined )
  expectProperty( 'root', 'nextSibling', root, undefined )
  expectProperty( 'root', 'firstChild', root, first )
  expectProperty( 'root', 'lastChild', root, last )

  expectProperty( 'first', 'parentNode', first, root )
  expectProperty( 'first', 'previousSibling', first, undefined )
  expectProperty( 'first', 'nextSibling', first, last )
  expectProperty( 'first', 'firstChild', first, undefined )
  expectProperty( 'first', 'lastChild', first, undefined )

  expectProperty( 'last', 'parentNode', last, root )
  expectProperty( 'last', 'previousSibling', last, first )
  expectProperty( 'last', 'nextSibling', last, undefined )
  expectProperty( 'last', 'firstChild', last, undefined )
  expectProperty( 'last', 'lastChild', last, undefined )
}

const expectThreeChildren = ( root, first, middle, last ) => {
  expectProperty( 'root', 'parentNode', root, undefined )
  expectProperty( 'root', 'previousSibling', root, undefined )
  expectProperty( 'root', 'nextSibling', root, undefined )
  expectProperty( 'root', 'firstChild', root, first )
  expectProperty( 'root', 'lastChild', root, last )

  expectProperty( 'first', 'parentNode', first, root )
  expectProperty( 'first', 'previousSibling', first, undefined )
  expectProperty( 'first', 'nextSibling', first, middle )
  expectProperty( 'first', 'firstChild', first, undefined )
  expectProperty( 'first', 'lastChild', first, undefined )

  expectProperty( 'middle', 'parentNode', middle, root )
  expectProperty( 'middle', 'previousSibling', middle, first )
  expectProperty( 'middle', 'nextSibling', middle, last )
  expectProperty( 'middle', 'firstChild', middle, undefined )
  expectProperty( 'middle', 'lastChild', middle, undefined )

  expectProperty( 'last', 'parentNode', last, root )
  expectProperty( 'last', 'previousSibling', last, middle )
  expectProperty( 'last', 'nextSibling', last, undefined )
  expectProperty( 'last', 'firstChild', last, undefined )
  expectProperty( 'last', 'lastChild', last, undefined )
}

module.exports = {
  expectDisconnected, expectOneChild, expectTwoChildren, expectThreeChildren
}
