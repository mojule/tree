'use strict'

const assert = require( 'assert' )
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

      assert.equal( child.root(), root )
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

    it( 'depth', () => {
      const { root, a, aa } = testTree()

      assert.equal( root.depth(), 0 )
      assert.equal( a.depth(), 1 )
      assert.equal( aa.depth(), 2 )
    })

    describe( 'find', () => {
      describe( 'default (dfs)', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = root.find( current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = root.find( current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })

      describe( 'ancestor', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = aa.find( 'ancestor', current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = aa.find( 'ancestor', current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })

      describe( 'bfs', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = root.find( 'bfs', current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = root.find( 'bfs', current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })

      describe( 'child', () => {
        it( 'find', () => {
          const { root, a, aa } = testTree()

          const target = root.find( 'child', current => current.value === 'a' )

          assert.deepEqual( target, a )
        })

        it( 'non existent', () => {
          const { root, a, aa } = testTree()

          const nope = aa.find( 'child', current => current.value === 'nope' )

          assert.equal( nope, undefined )
        })
      })
    })

    describe( 'findAll', () => {
      describe( 'default (dfs)', () => {
        it( 'findAll', () => {
          const { root, a, aa, ba, ca } = testTree()

          const result = root.findAll( current => current.value.endsWith( 'a' ) )

          assert.deepEqual( result, [ a, aa, ba, ca ] )
        })

        it( 'findAllDfs', () => {
          const { root, a, aa, ba, ca } = testTree()

          const result = root.findAllDfs( current => current.value.endsWith( 'a' ) )

          assert.deepEqual( result, [ a, aa, ba, ca ] )
        })

        it( 'non existent', () => {
          const { root } = testTree()

          const nope = root.findAll( current => current.value === 'nope' )

          assert.deepEqual( nope, [] )
        })
      })

      describe( 'ancestor', () => {
        it( 'findAll', () => {
          const { root, a, aa, ba, ca } = testTree()

          const result = aa.findAll( 'ancestor', current => current.value.endsWith( 'a' ) )

          assert.deepEqual( result, [ a ] )
        })

        it( 'non existent', () => {
          const { root, a, aa, ba, ca } = testTree()

          const nope = aa.findAll( current => current.value === 'nope' )

          assert.deepEqual( nope, [] )
        })
      })

      describe( 'bfs', () => {
        it( 'findAll', () => {
          const { root, a, b, aa, ab, ac, ba, bb, bc } = testTree()

          const result = root.findAll( 'bfs', current =>
            current.value.startsWith( 'a' ) || current.value.startsWith( 'b' )
          )

          assert.deepEqual( result, [ a, b, aa, ab, ac, ba, bb, bc ] )
        })

        it( 'non existent', () => {
          const { root } = testTree()

          const nope = root.findAll( 'bfs', current => current.value === 'nope' )

          assert.deepEqual( nope, [] )
        })
      })

      describe( 'child', () => {
        it( 'findAll', () => {
          const { root, a, b } = testTree()

          const result = root.findAll( 'child', current =>
            current.value.startsWith( 'a' ) || current.value.startsWith( 'b' )
          )

          assert.deepEqual( result, [ a, b ] )
        })

        it( 'non existent', () => {
          const { root } = testTree()

          const nope = root.findAll( 'child', current => current.value === 'nope' )

          assert.deepEqual( nope, [] )
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

    describe( 'has', () => {
      it( 'default (dfs)', () => {
        const { root, a } = testTree()

        assert( root.has( a ) )
        assert( !a.has( root ) )
      })

      it( 'named (dfs)', () => {
        const { root, a } = testTree()

        assert( root.has( 'dfs', a ) )
        assert( !a.has( 'dfs', root ) )
      })

      it( 'hasDfs', () => {
        const { root, a } = testTree()

        assert( root.hasDfs( a ) )
        assert( !a.hasDfs( root ) )
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

    describe( 'childAt', () => {
      it( 'no children', () => {
        const root = Tree( 'root' )

        const childAt0 = root.childAt( 0 )

        assert.strictEqual( childAt0, undefined )
      })

      it( 'children and exists', () => {
        const { root, a, b, c } = testTree()

        const childAt0 = root.childAt( 0 )
        const childAt1 = root.childAt( 1 )
        const childAt2 = root.childAt( 2 )

        assert.strictEqual( childAt0, a )
        assert.strictEqual( childAt1, b )
        assert.strictEqual( childAt2, c )
      })

      it( 'children and does not exist', () => {
        const { root, a, b, c } = testTree()

        const childAt3 = root.childAt( 3 )

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

        aa.ancestor( current => {
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

        aa.ancestor( current => {
          values.push( current.value )

          return current === a
        })

        assert.deepEqual( expect, values )
      })

      it( 'ancestor no callback', () => {
        const { root, a, aa } = testTree()

        const expect = [ a, root ]

        const values = Array.from( aa.ancestor() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, aa.getAncestor() )
      })
    })

    describe( 'bfs', () => {
      it( 'bfs', () => {
        const { root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc } = testTree()

        const expect = [
          root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc
        ]

        const nodes = []

        root.bfs( current => {
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

        root.bfs( current => {
          values.push( current.value )

          return current === c
        })

        assert.deepEqual( expect, values )
      })

      it( 'bfs no callback', () => {
        const {
          root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc
        } = testTree()

        const expect = [
          root, a, b, c, aa, ab, ac, ba, bb, bc, ca, cb, cc
        ]

        const values = Array.from( root.bfs() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, root.getBfs() )
      })
    })

    describe( 'branch', () => {
      it( 'branch', () => {
        const { root, a, b, c } = testTree()

        const expect = [ root, a, b, c ]

        const nodes = []

        root.branch( current => {
          nodes.push( current )
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'branch early return', () => {
        const { root, a, b, c } = testTree()

        const expect = [ root, a ]

        const nodes = []

        root.branch( current => {
          nodes.push( current )

          return current === a
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'branch no callback', () => {
        const { root, a, b, c } = testTree()

        const expect = [ root, a, b, c ]

        const values = Array.from( root.branch() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, root.getBranch() )
      })
    })

    describe( 'child', () => {
      it( 'child', () => {
        const { root, a, b, c } = testTree()

        const expect = [
          'a', 'b', 'c'
        ]

        const values = []

        root.child( current => {
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

        root.child( current => {
          values.push( current.value )

          return current === b
        })

        assert.deepEqual( expect, values )
      })

      it( 'child no callback', () => {
        const { root, a, b, c } = testTree()

        const expect = [ a, b, c ]

        const values = Array.from( root.child() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, root.getChild() )
      })


      it( 'childNodes', () => {
        const { root, a, b, c } = testTree()

        const expect = [ a, b, c ]

        let values = Array.from( root.childNodes )

        assert.deepEqual( expect, values )

        values = Array.from( root.childNodes )

        assert.deepEqual( expect, values )

        const result = root.childNodes.find( n => n.value === 'a' )

        assert.deepEqual( result, a )

        let n = root.childNodes

        values = Array.from( n )

        assert.deepEqual( expect, values )

        values = Array.from( n )

        assert.deepEqual( expect, values )

        assert.deepEqual( root.childNodes[ 0 ], a )

        assert.deepEqual( root.childNodes.length, 3 )
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

        root.descendant( current => {
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

        root.descendant( current => {
          values.push( current.value )

          return current === ac
        })

        assert.deepEqual( expect, values )
      })

      it( 'descendant no callback', () => {
        const {
          root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        } = testTree()

        const expect = [
          a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        ]

        const values = Array.from( root.descendant() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, root.getDescendant() )
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

        root.dfs( current => {
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

        root.dfs( current => {
          values.push( current.value )

          return current === ac
        })

        assert.deepEqual( expect, values )
      })

      it( 'dfs no callback', () => {
        const {
          root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        } = testTree()

        const expect = [
          root, a, aa, ab, ac, b, ba, bb, bc, c, ca, cb, cc
        ]

        const values = Array.from( root.dfs() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, root.getDfs() )
      })
    })

    describe( 'leaf', () => {
      it( 'leaf', () => {
        const { root, aa, ab, ac, ba, bb, bc, ca, cb, cc } = testTree()

        const expect = [ aa, ab, ac, ba, bb, bc, ca, cb, cc ]

        const nodes = []

        root.leaf( current => {
          nodes.push( current )
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'leaf early return', () => {
        const { root, aa, ab } = testTree()

        const expect = [ aa, ab ]

        const nodes = []

        root.leaf( current => {
          nodes.push( current )

          return current === ab
        })

        assert.deepEqual( expect, nodes )
      })

      it( 'leaf no callback', () => {
        const { root, aa, ab, ac, ba, bb, bc, ca, cb, cc } = testTree()

        const expect = [ aa, ab, ac, ba, bb, bc, ca, cb, cc ]

        const values = Array.from( root.leaf() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, root.getLeaf() )
      })
    })

    describe( 'inclusiveAncestor', () => {
      it( 'inclusiveAncestor', () => {
        const { root, a, aa } = testTree()

        const expect = [
          'aa', 'a', 'root'
        ]

        const values = []

        aa.inclusiveAncestor( current => {
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

        aa.inclusiveAncestor( current => {
          values.push( current.value )

          return current === a
        })

        assert.deepEqual( expect, values )
      })

      it( 'inclusiveAncestor no callback', () => {
        const { root, a, aa } = testTree()

        const expect = [ aa, a, root ]

        const values = Array.from( aa.inclusiveAncestor() )

        assert.deepEqual( expect, values )
        assert.deepEqual( expect, aa.getInclusiveAncestor() )
      })
    })
  })
})
