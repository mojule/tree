'use strict'

const Tree = require( '../../' )

const testTree = () => {
  const root = Tree( 'root' )

  const a = Tree( 'a' )
  const b = Tree( 'b' )
  const c = Tree( 'c' )

  const aa = Tree( 'aa' )
  const ab = Tree( 'ab' )
  const ac = Tree( 'ac' )

  const ba = Tree( 'ba' )
  const bb = Tree( 'bb' )
  const bc = Tree( 'bc' )

  const ca = Tree( 'ca' )
  const cb = Tree( 'cb' )
  const cc = Tree( 'cc' )

  root.appendChild( a )
  root.appendChild( b )
  root.appendChild( c )

  a.appendChild( aa )
  a.appendChild( ab )
  a.appendChild( ac )

  b.appendChild( ba )
  b.appendChild( bb )
  b.appendChild( bc )

  c.appendChild( ca )
  c.appendChild( cb )
  c.appendChild( cc )

  return { root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc }
}

module.exports = testTree
