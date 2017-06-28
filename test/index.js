'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const Tree = require( '../' )
const testTree = require( './fixtures/test-tree' )
const expect = require( './fixtures/expect' )

const {
  expectDisconnected, expectOneChild, expectTwoChildren, expectThreeChildren
} = expect

describe( 'Tree', () => {
  it( 'create', () => {
    const root = Tree( 'root' )

    assert( root.value === 'root' )
  })

  describe( 'functional', () => {
    describe( 'clone', () => {
      const { root } = testTree()
      const cloned = root.clone()

      assert.deepEqual(
        cloned.serialize(),
        ["root",["a",["aa"],["ab"],["ac"]],["b",["ba"],["bb"],["bc"]],["c",["ca"],["cb"],["cc"]]]
      )
    })
  })

  describe( 'manipulation', () => {
    describe( 'appendChild to empty node', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )

      root.appendChild( first )

      expectOneChild( root, first )
    })

    describe( 'appendChild to node with existing child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )

      root.appendChild( first )
      root.appendChild( last )

      expectTwoChildren( root, first, last )
    })

    describe( 'prependChild to empty node', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )

      root.prependChild( first )

      expectOneChild( root, first )
    })

    describe( 'prependChild to node with existing child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )

      root.appendChild( last )
      root.prependChild( first )

      expectTwoChildren( root, first, last )
    })

    describe( 'insertAfter to middle', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )
      const middle = Tree( 'middle' )

      root.appendChild( first )
      root.appendChild( last )
      root.insertAfter( middle, first )

      expectThreeChildren( root, first, middle, last )
    })

    describe( 'insertAfter no reference', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )

      root.insertAfter( first )

      expectOneChild( root, first )
    })

    describe( 'insertAfter bad reference', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )
      const middle = Tree( 'middle' )

      root.appendChild( first )
      assert.throws( () => root.insertAfter( last, middle ) )
    })

    describe( 'insertBefore to node with existing child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )

      root.appendChild( last )
      root.insertBefore( first, last )

      expectTwoChildren( root, first, last )
    })

    describe( 'insertBefore to middle', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )
      const middle = Tree( 'middle' )

      root.appendChild( first )
      root.appendChild( last )
      root.insertBefore( middle, last )

      expectThreeChildren( root, first, middle, last )
    })

    describe( 'insertBefore no reference', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )

      root.insertBefore( first )

      expectOneChild( root, first )
    })

    describe( 'insertBefore bad reference', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )
      const middle = Tree( 'middle' )

      root.appendChild( first )
      assert.throws( () => root.insertBefore( last, middle ) )
    })

    describe( 'replaceChild', () => {
      describe( 'first', () => {
        const root = Tree( 'root' )
        const first = Tree( 'first' )
        const old = Tree( 'old' )
        const middle = Tree( 'middle' )
        const last = Tree( 'last' )

        root.appendChild( old )
        root.appendChild( middle )
        root.appendChild( last )

        root.replaceChild( old, first )

        expectThreeChildren( root, first, middle, last )
      })

      describe( 'middle', () => {
        const root = Tree( 'root' )
        const old = Tree( 'old' )
        const first = Tree( 'first' )
        const middle = Tree( 'middle' )
        const last = Tree( 'last' )

        root.appendChild( first )
        root.appendChild( old )
        root.appendChild( last )

        root.replaceChild( old, middle )

        expectThreeChildren( root, first, middle, last )
      })

      describe( 'last', () => {
        const root = Tree( 'root' )
        const old = Tree( 'old' )
        const first = Tree( 'first' )
        const middle = Tree( 'middle' )
        const last = Tree( 'last' )

        root.appendChild( first )
        root.appendChild( middle )
        root.appendChild( old )

        root.replaceChild( old, last )

        expectThreeChildren( root, first, middle, last )
      })
    })

    describe( 'remove', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )

      root.appendChild( first )
      first.remove()

      expectDisconnected( root )
      expectDisconnected( first )
    })

    describe( 'remove root throws', () => {
      const root = Tree( 'root' )
      assert.throws( () => root.remove() )
    })

    describe( 'removeAll', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const middle = Tree( 'middle' )
      const last = Tree( 'last' )

      root.appendChild( first )
      root.appendChild( middle )
      root.appendChild( last )

      root.removeAll()

      expectDisconnected( root )
      expectDisconnected( first )
      expectDisconnected( middle )
      expectDisconnected( last )
    })

    describe( 'removeChild only child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )

      root.appendChild( first )
      root.removeChild( first )

      expectDisconnected( root )
      expectDisconnected( first )
    })

    describe( 'removeChild first child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )

      root.appendChild( first )
      root.appendChild( last )

      root.removeChild( first )

      expectOneChild( root, last )
      expectDisconnected( first )
    })

    describe( 'removeChild last child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const last = Tree( 'last' )

      root.appendChild( first )
      root.appendChild( last )

      root.removeChild( last )

      expectOneChild( root, first )
      expectDisconnected( last )
    })

    describe( 'removeChild middle child', () => {
      const root = Tree( 'root' )
      const first = Tree( 'first' )
      const middle = Tree( 'middle' )
      const last = Tree( 'last' )

      root.appendChild( first )
      root.appendChild( middle )
      root.appendChild( last )

      root.removeChild( middle )

      expectTwoChildren( root, first, last )
      expectDisconnected( middle )
    })

    describe( 'unwrap', () => {
      const { root, a, aa, ab, ac, b, c } = testTree()

      a.unwrap()
      b.remove()
      c.remove()

      expectDisconnected( a )
      expectThreeChildren( root, aa, ab, ac )
    })

    it( 'unwrap root throws', () => {
      const { root } = testTree()

      assert.throws( () => root.unwrap() )
    })

    it( 'wrap', () => {
      const root = Tree( 'root' )
      const child = Tree( 'child' )
      const grandchild = Tree( 'grandchild' )

      root.appendChild( grandchild )
      grandchild.wrap( child )

      assert.equal( grandchild.parentNode, child )
      assert.equal( child.parentNode, root )
    })

    it( 'wrap root', () => {
      const root = Tree( 'root' )
      const child = Tree( 'child' )

      child.wrap( root )

      assert.equal( child.rootNode, root )
      assert.equal( child.parentNode, root )
    })
  })

  describe( 'query', () => {
    it( 'accepts', () => {
      const root = Tree( 'root' )
      const child = Tree( 'child' )

      assert( root.accepts( child ) )
    })

    describe( 'atPath', () => {
      it( 'atPath', () => {
        const { root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc } = testTree()

        assert.equal( root.atPath( '/' ), root )
        assert.equal( root.atPath( '/0' ), a )
        assert.equal( root.atPath( '/0/0' ), aa )
        assert.equal( root.atPath( '/0/1' ), ab )
        assert.equal( root.atPath( '/0/2' ), ac )
        assert.equal( root.atPath( '/1' ), b )
        assert.equal( root.atPath( '/1/0' ), ba )
        assert.equal( root.atPath( '/1/1' ), bb )
        assert.equal( root.atPath( '/1/2' ), bc )
        assert.equal( root.atPath( '/2' ), c )
        assert.equal( root.atPath( '/2/0' ), ca )
        assert.equal( root.atPath( '/2/1' ), cb )
        assert.equal( root.atPath( '/2/2' ), cc )
      })

      it( 'bad path', () => {
        const { root } = testTree()

        assert.strictEqual( root.atPath( '/3' ), undefined )
        assert.strictEqual( root.atPath( '/3/3' ), undefined )
      })
    })

    describe( 'contains', () => {
      it( 'exists', () => {
        const { root, ac } = testTree()

        assert( root.contains( ac ) )
      })

      it( 'does not exist', () => {
        const { root, ac } = testTree()

        assert( !root.contains( root ) )
        assert( !ac.contains( root ) )
      })
    })

    it( 'depth', () => {
      const { root, a, aa } = testTree()

      assert.equal( root.depth(), 0 )
      assert.equal( a.depth(), 1 )
      assert.equal( aa.depth(), 2 )
    })

    describe( 'find', () => {
      describe( 'default (dfs)', () => {
        it( 'find dfs', () => {
          const { root, a, aa } = testTree()

          const target = root.dfsNodes.find( current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = root.dfsNodes.find( current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })

      describe( 'ancestor', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = aa.ancestorNodes.find( current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = aa.ancestorNodes.find( current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })

      describe( 'bfs', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = root.bfsNodes.find( current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = root.bfsNodes.find( current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })

      describe( 'child', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = root.childNodes.find( current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = aa.childNodes.find( current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })
    })

    describe( 'filter', () => {
      describe( 'dfs', () => {
        it( 'filter', () => {
          const { root, a, aa, ba, ca } = testTree()

          const result = root.dfsNodes.filter( current => current.value.endsWith( 'a' ) )

          assert.deepEqual( result.toArray(), [ a, aa, ba, ca ] )
        })

        it( 'non existent', () => {
          const { root } = testTree()

          const nope = root.dfsNodes.filter( current => current.value === 'nope' )

          assert.deepEqual( nope.toArray(), [] )
        })
      })

      describe( 'ancestor', () => {
        it( 'filter', () => {
          const { root, a, aa, ba, ca } = testTree()

          const result = aa.ancestorNodes.filter( current => current.value.endsWith( 'a' ) )

          assert.deepEqual( result.toArray(), [ a ] )
        })

        it( 'non existent', () => {
          const { root, a, aa, ba, ca } = testTree()

          const nope = aa.ancestorNodes.filter( current => current.value === 'nope' )

          assert.deepEqual( nope.toArray(), [] )
        })
      })

      describe( 'bfs', () => {
        it( 'filter', () => {
          const { root, a, b, aa, ab, ac, ba, bb, bc } = testTree()

          const result = root.bfsNodes.filter( current =>
            current.value.startsWith( 'a' ) || current.value.startsWith( 'b' )
          )

          assert.deepEqual( result.toArray(), [ a, b, aa, ab, ac, ba, bb, bc ] )
        })

        it( 'non existent', () => {
          const { root } = testTree()

          const nope = root.bfsNodes.filter( current =>
            current.value === 'nope'
          )

          assert.deepEqual( nope.toArray(), [] )
        })
      })

      describe( 'child', () => {
        it( 'filter', () => {
          const { root, a, b } = testTree()

          const result = root.childNodes.filter( current =>
            current.value.startsWith( 'a' ) || current.value.startsWith( 'b' )
          )

          assert.deepEqual( result.toArray(), [ a, b ] )
        })

        it( 'non existent', () => {
          const { root } = testTree()

          const nope = root.childNodes.filter( current =>
            current.value === 'nope'
          )

          assert.deepEqual( nope.toArray(), [] )
        })
      })
    })

    describe( 'getPath', () => {
      it( 'getPath', () => {
        const { root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc } = testTree()

        assert.equal( root.getPath(), '/' )
        assert.equal( a.getPath(), '/0' )
        assert.equal( aa.getPath(), '/0/0' )
        assert.equal( ab.getPath(), '/0/1' )
        assert.equal( ac.getPath(), '/0/2' )
        assert.equal( b.getPath(), '/1' )
        assert.equal( ba.getPath(), '/1/0' )
        assert.equal( bb.getPath(), '/1/1' )
        assert.equal( bc.getPath(), '/1/2' )
        assert.equal( c.getPath(), '/2' )
        assert.equal( ca.getPath(), '/2/0' )
        assert.equal( cb.getPath(), '/2/1' )
        assert.equal( cc.getPath(), '/2/2' )
      })

      it( 'bad separator', () => {
        const { a } = testTree()

        assert.throws( () => a.getPath( '0' ) )
        assert.throws( () => a.getPath( '' ) )
      })
    })

    describe( 'hasChildNodes', () => {
      it( 'has', () => {
        const { root } = testTree()

        assert( root.hasChildNodes() )
      })

      it( 'does not have', () => {
        const { ac } = testTree()

        assert( !ac.hasChildNodes() )
      })
    })

    describe( 'includes', () => {
      it( 'dfs', () => {
        const { root, a } = testTree()

        assert( root.dfsNodes.includes( a ) )
      })

      it( 'non existent', () => {
        const { root, a } = testTree()

        assert( !a.dfsNodes.includes( root ) )
      })
    })

    describe( 'index', () => {
      it( 'no index', () => {
        const { root } = testTree()

        assert.equal( root.index(), undefined )
      })

      it( 'index', () => {
        const { aa, ab, ac } = testTree()

        assert.equal( aa.index(), 0 )
        assert.equal( ab.index(), 1 )
        assert.equal( ac.index(), 2 )
      })
    })

    it( 'isBranch', () => {
      const { root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc } = testTree()

      assert( root.isBranch() )
      assert( a.isBranch() )
      assert( b.isBranch() )
      assert( c.isBranch() )
      assert( !aa.isBranch() )
      assert( !ab.isBranch() )
      assert( !ac.isBranch() )
      assert( !ba.isBranch() )
      assert( !bb.isBranch() )
      assert( !bc.isBranch() )
      assert( !ca.isBranch() )
      assert( !cb.isBranch() )
      assert( !cc.isBranch() )
    })

    it( 'isLeaf', () => {
      const { root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc } = testTree()

      assert( !root.isLeaf() )
      assert( !a.isLeaf() )
      assert( !b.isLeaf() )
      assert( !c.isLeaf() )
      assert( aa.isLeaf() )
      assert( ab.isLeaf() )
      assert( ac.isLeaf() )
      assert( ba.isLeaf() )
      assert( bb.isLeaf() )
      assert( bc.isLeaf() )
      assert( ca.isLeaf() )
      assert( cb.isLeaf() )
      assert( cc.isLeaf() )
    })

    describe( 'value', () => {
      const { root } = testTree()

      assert.strictEqual( root.value, 'root' )

      root.value = 'new value'

      assert.strictEqual( root.value, 'new value' )
    })

    describe( 'indexers', () => {
      it( 'no children', () => {
        const root = Tree( 'root' )

        const childAt0 = root.childNodes[ 0 ]

        assert.strictEqual( childAt0, undefined )
      })

      it( 'children and exists', () => {
        const { root, a, b, c } = testTree()

        const childAt0 = root.childNodes[ 0 ]
        const childAt1 = root.childNodes[ 1 ]
        const childAt2 = root.childNodes[ 2 ]

        assert.strictEqual( childAt0, a )
        assert.strictEqual( childAt1, b )
        assert.strictEqual( childAt2, c )
      })

      it( 'children and does not exist', () => {
        const { root, a, b, c } = testTree()

        const childAt3 = root.childNodes[ 3 ]

        assert.strictEqual( childAt3, undefined )
      })
    })
  })

  describe( 'serializer', () => {
    const { root } = testTree()
    const serialized = root.serialize()

    it( 'serializes', () => {
      assert.deepEqual(
        serialized,
        ["root",["a",["aa"],["ab"],["ac"]],["b",["ba"],["bb"],["bc"]],["c",["ca"],["cb"],["cc"]]]
      )
    })

    it( 'deserializes', () => {
      const deserialized = Tree.deserialize( serialized )
      const roundTripped = deserialized.serialize()

      assert.deepEqual(
        roundTripped,
        ["root",["a",["aa"],["ab"],["ac"]],["b",["ba"],["bb"],["bc"]],["c",["ca"],["cb"],["cc"]]]
      )
    })
  })

  describe( 'traversal', () => {
    describe( 'ancestor', () => {
      it( 'ancestor', () => {
        const { root, a, aa } = testTree()

        const expect = [
          'a', 'root'
        ]

        const values = []

        aa.ancestorNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'ancestor early return', () => {
        const { root, a, aa } = testTree()

        const expect = [
          'a'
        ]

        const values = []

        for( let current of aa.ancestorNodes ){
          values.push( current.value )

          if( current === a ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'ancestor array', () => {
        const { root, a, aa } = testTree()

        const expect = [ a, root ]

        const values = aa.ancestorNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'bfs', () => {
      it( 'bfs', () => {
        const { root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc } = testTree()

        const expect = [
          root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc
        ]

        const nodes = []

        root.bfsNodes.forEach( current => {
          nodes.push( current )
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'bfs early return', () => {
        const { root, a, b, c } = testTree()

        const expect = [
          'root', 'a', 'b', 'c'
        ]

        const values = []

        for( let current of root.bfsNodes ){
          values.push( current.value )

          if( current === c ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'bfs array', () => {
        const {
          root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc
        } = testTree()

        const expect = [
          root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc
        ]

        const values = root.bfsNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'branch', () => {
      it( 'branch', () => {
        const { root, a, b, c } = testTree()

        const expect = [ root, a, b, c ]

        const nodes = []

        root.branchNodes.forEach( current => {
          nodes.push( current )
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'branch early return', () => {
        const { root, a, b, c } = testTree()

        const expect = [ root, a ]

        const nodes = []

        for( let current of root.branchNodes ){
          nodes.push( current )

          if( current === a ) break
        }

        assert.deepEqual( expect, nodes )
      })

      it( 'branch array', () => {
        const { root, a, b, c } = testTree()

        const expect = [ root, a, b, c ]

        const values = root.branchNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'child', () => {
      it( 'child', () => {
        const { root, a, b, c } = testTree()

        const expect = [
          'a', 'b', 'c'
        ]

        const values = []

        root.childNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'child early return', () => {
        const { root, a, b, c } = testTree()

        const expect = [
          'a', 'b'
        ]

        const values = []

        for( let current of root.childNodes ){
          values.push( current.value )

          if( current === b ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'child array', () => {
        const { root, a, b, c } = testTree()

        const expect = [ a, b, c ]

        const values = root.childNodes.toArray()

        assert.deepEqual( expect, values )
      })

      describe( 'multiple calls', () => {
        const { root, a, b, c } = testTree()
        const n = root.childNodes

        const expect = [ a, b, c ]

        it( 'calls once', () => {
          const values = root.childNodes.toArray()

          assert.deepEqual( expect, values )
        })

        it( 'calls twice', () => {
          const values = root.childNodes.toArray()

          assert.deepEqual( expect, values )
        })

        it( 'finds', () => {
          const result = root.childNodes.find( n => n.value === 'a' )

          assert.deepEqual( result, a )
        })

        it( 'from assignment once', () => {
          const values = n.toArray()

          assert.deepEqual( expect, values )
        })

        it( 'from assignment twice', () => {
          const values = n.toArray()

          assert.deepEqual( expect, values )
        })

        it( 'final check', () => {
          assert.deepEqual( root.childNodes[ 0 ], a )
          assert.deepEqual( root.childNodes.length, 3 )
        })
      })
    })

    describe( 'descendant', () => {
      it( 'descendant', () => {
        const { root } = testTree()

        const expect = [
          'a', 'aa', 'ab', 'ac', 'b', 'ba', 'bb', 'bc', 'c', 'ca', 'cb',
          'cc'
        ]

        const values = []

        root.descendantNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'descendant early return', () => {
        const { root, a, aa, ab, ac } = testTree()

        const expect = [
          'a', 'aa', 'ab', 'ac'
        ]

        const values = []

        for( let current of root.descendantNodes ){
          values.push( current.value )

          if( current === ac ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'descendant array', () => {
        const {
          root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        } = testTree()

        const expect = [
          a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        ]

        const values = root.descendantNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'dfs', () => {
      it( 'dfs', () => {
        const { root } = testTree()

        const expect = [
          'root', 'a', 'aa', 'ab', 'ac', 'b', 'ba', 'bb', 'bc', 'c', 'ca', 'cb',
          'cc'
        ]

        const values = []

        root.dfsNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'dfs early return', () => {
        const { root, a, aa, ab, ac } = testTree()

        const expect = [
          'root', 'a', 'aa', 'ab', 'ac'
        ]

        const values = []

        for( let current of root.dfsNodes ){
          values.push( current.value )

          if( current === ac ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'dfs array', () => {
        const {
          root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        } = testTree()

        const expect = [
          root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        ]

        const values = root.dfsNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'leaf', () => {
      it( 'leaf', () => {
        const { root, aa, ab, ac, ba, bb, bc, ca, cb, cc } = testTree()

        const expect = [ aa, ab, ac, ba, bb, bc, ca, cb, cc ]

        const nodes = []

        root.leafNodes.forEach( current => {
          nodes.push( current )
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'leaf early return', () => {
        const { root, aa, ab } = testTree()

        const expect = [ aa, ab ]

        const nodes = []

        for( let current of root.leafNodes ){
          nodes.push( current )

          if( current === ab ) break
        }

        assert.deepEqual( expect, nodes )
      })

      it( 'leaf array', () => {
        const { root, aa, ab, ac, ba, bb, bc, ca, cb, cc } = testTree()

        const expect = [ aa, ab, ac, ba, bb, bc, ca, cb, cc ]

        const values = root.leafNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'inclusiveAncestor', () => {
      it( 'inclusiveAncestor', () => {
        const { root, a, aa } = testTree()

        const expect = [
          'aa', 'a', 'root'
        ]

        const values = []

        aa.inclusiveAncestorNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'inclusiveAncestor early return', () => {
        const { root, a, aa } = testTree()

        const expect = [
          'aa', 'a'
        ]

        const values = []

        for( let current of aa.inclusiveAncestorNodes ){
          values.push( current.value )

          if( current === a ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'inclusiveAncestor array', () => {
        const { root, a, aa } = testTree()

        const expect = [ aa, a, root ]

        const values = aa.inclusiveAncestorNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'nextSibling', () => {
      it( 'nextSibling', () => {
        const { a, b, c } = testTree()

        const expect = [
          'b', 'c'
        ]

        const values = []

        a.nextSiblingNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'nextSibling early return', () => {
        const { a, b, c } = testTree()

        const expect = [
          'b'
        ]

        const values = []

        for( let current of a.nextSiblingNodes ){
          values.push( current.value )

          if( current === b ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'nextSibling array', () => {
        const { a, b, c } = testTree()

        const expect = [ b, c ]

        const values = a.nextSiblingNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'previousSibling', () => {
      it( 'previousSibling', () => {
        const { a, b, c } = testTree()

        const expect = [
          'b', 'a'
        ]

        const values = []

        c.previousSiblingNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'previousSibling early return', () => {
        const { a, b, c } = testTree()

        const expect = [
          'b'
        ]

        const values = []

        for( let current of c.previousSiblingNodes ){
          values.push( current.value )

          if( current === b ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'previousSibling array', () => {
        const { a, b, c } = testTree()

        const expect = [ b, a ]

        const values = c.previousSiblingNodes.toArray()

        assert.deepEqual( expect, values )
      })
    })

    describe( 'sibling', () => {
      it( 'sibling', () => {
        const { a, b, c } = testTree()

        const expect = [
          'a', 'c'
        ]

        const values = []

        b.siblingNodes.forEach( current => {
          values.push( current.value )
        })

        assert.deepEqual( expect, values )
      })

      it( 'sibling early return', () => {
        const { a, b, c } = testTree()

        const expect = [
          'b'
        ]

        const values = []

        for( let current of a.siblingNodes ){
          values.push( current.value )

          if( current === b ) break
        }

        assert.deepEqual( expect, values )
      })

      it( 'sibling array', () => {
        const { a, b, c } = testTree()

        const expect = [ a, c ]

        const values = b.siblingNodes.toArray()

        assert.deepEqual( expect, values )
      })

      it( 'no siblings for root', () => {
        const root = Tree( 'root' )

        assert.deepEqual( root.siblingNodes.toArray(), [] )
      })
    })
  })

  describe( 'nodeName', () => {
    it( 'non-object', () => {
      const node = Tree( 'root' )

      assert.strictEqual( node.nodeName, 'node' )
    })

    it( 'from meta', () => {
      const node = Tree( 'root' )

      node.meta.nodeName = 'element'

      assert.strictEqual( node.nodeName, 'element' )
    })

    it( 'object with nodeName', () => {
      const node = Tree({ nodeName: 'element' })

      assert.strictEqual( node.nodeName, 'element' )
    })

    it( 'object without nodeName', () => {
      const node = Tree({ a: 1 })

      assert.strictEqual( node.nodeName, 'node' )
    })

    describe( 'registration', () => {
      const plugins = {
        privates: ({ privates }) => {
          privates.registerNodeName({
            name: 'empty',
            isEmpty: true
          })
          privates.registerNodeName({
            name: 'container',
            isEmpty: false
          })
          privates.registerNodeName({
            name: 'fooContainer',
            isEmpty: false,
            accepts: name => name === 'foo'
          })
          privates.registerNodeName({
            name: 'foo',
            isEmpty: true
          })
        },
        api: ({ api, privates }) => {
          api.createFooContainer = value => privates.createNode( 'fooContainer', value )
          api.createFoo = value => privates.createNode( 'foo', value )
          api.nodeNames = () => privates.nodeNames
        }
      }

      const FooTree = Tree.Factory( plugins )

      it( 'nodeNames are registered', () => {
        const root = FooTree( 'root' )

        assert.deepEqual( root.nodeNames(), [ 'empty', 'container', 'fooContainer', 'foo' ] )
      })

      it( 'empty', () => {
        const empty = FooTree({ nodeName: 'empty' })
        const container = FooTree({ nodeName: 'container' })
        const fooContainer = FooTree({ nodeName: 'fooContainer' })
        const foo = FooTree({ nodeName: 'foo' })

        assert( empty.isEmpty() )
        assert( foo.isEmpty() )
        assert( !container.isEmpty() )
        assert( !fooContainer.isEmpty() )
      })

      it( 'accepts', () => {
        const empty = FooTree({ nodeName: 'empty' })
        const container = FooTree({ nodeName: 'container' })
        const fooContainer = FooTree({ nodeName: 'fooContainer' })
        const foo = FooTree({ nodeName: 'foo' })

        assert( !empty.accepts( container ) )
        assert( container.accepts( empty ) )
        assert( fooContainer.accepts( foo ) )
        assert( !fooContainer.accepts( empty ) )
      })

      it( 'create', () => {
        const root = FooTree()
        const fooContainer = root.createFooContainer()

        assert.strictEqual( fooContainer.nodeName, 'fooContainer' )
      })
    })
  })

  describe( 'rootNode', () => {
    it( 'is correct root', () => {
      const { root, a, aa } = testTree()

      assert.strictEqual( root, root.rootNode )
      assert.strictEqual( root, a.rootNode )
      assert.strictEqual( root, aa.rootNode )
    })
  })

  describe( 'slug', () => {
    it( 'is correct slug', () => {
      const { root, a, aa } = testTree()

      assert.strictEqual( root.slug(), '' )
      assert.strictEqual( a.slug(), '0' )
      assert.strictEqual( aa.slug(), '0' )
    })
  })

  describe( 'treeName', () => {
    it( 'is correct', () => {
      const { root } = testTree()

      assert.strictEqual( root.treeName, 'tree' )
    })
  })

  describe( 'object values', () => {
    it( 'assign', () => {
      const node = Tree( { a: 1 } )

      node.assign( { b: 2 } )

      assert.deepEqual( node.value, { a: 1, b: 2 } )
    })

    it( 'id', () => {
      const node = Tree({ a: 1 })

      const { id } = node

      assert( is.string( id ) )
      assert( id.startsWith( 'node-' ) )

      assert.strictEqual( id, node.value.id )
      assert.strictEqual( id, node.id )
    })
  })

  describe( 'register properties', () => {
    const plugins = {
      api: ({ api, privates }) => {
        privates.registerGet({
          target: api,
          name: 'propertyNames',
          get: () => privates.propertyNames
        })

        let foo = true

        privates.registerProperty({
          target: api,
          name: 'foo',
          get: () => foo,
          set: value => foo = value
        })
      }
    }

    const Tree2 = Tree.Factory( plugins )

    it( 'read only', () => {
      const root = Tree2( 'root' )

      assert( is.array( root.propertyNames ) )
      assert( root.propertyNames.includes( 'foo' ) )
    })

    it( 'property', () => {
      const root = Tree2( 'root' )

      assert.strictEqual( root.foo, true )

      root.foo = false

      assert.strictEqual( root.foo, false )
    })
  })


})
