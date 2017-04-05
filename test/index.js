'use strict'

const assert = require( 'assert' )
const is = require( '@mojule/is' )
const Tree = require( '../src' )

describe( 'Tree', () => {
  describe( 'adapter', () => {
    it( 'isNode', () => {
      const node = [{}]

      assert( Tree.isNode( node ) )
      assert( !Tree.isNode( 'a' ) )
      assert( !Tree.isNode( [] ) )
    })

    it( 'isValue', () => {
      assert( Tree.isValue( {} ) )
      assert( !Tree.isValue( 'a' ) )
      assert( !Tree.isValue( [] ) )
      assert( !Tree.isValue( [{}] ) )
    })

    it( 'getChildren', () => {
      const animalia = Tree( { name: 'Animalia' } )
      const chordata = Tree( { name: 'Chordata' } )
      const arthropoda = Tree( { name: 'Arthropoda' } )

      animalia.add( chordata )
      animalia.add( arthropoda )

      assert.equal( animalia.getChildren().length, 2 )
    })

    it( 'getValue', () => {
      const animalia = Tree( { name: 'Animalia' } )

      assert.deepEqual( animalia.getValue(), { name: 'Animalia' } )
    })

    it( 'setValue', () => {
      const animalia = Tree( { name: 'Animalia' } )

      animalia.setValue( { name: 'Root' } )

      assert.deepEqual( animalia.getValue(), { name: 'Root' } )
    })

    it( 'remove', () => {
      const animalia = Tree( { name: 'Animalia' } )
      const chordata = Tree( { name: 'Chordata' } )
      const arthropoda = Tree( { name: 'Arthropoda' } )

      animalia.add( chordata )
      animalia.add( arthropoda )

      animalia.remove( chordata )

      assert.equal( animalia.getChildren().length, 1 )

      arthropoda.remove()

      assert.equal( animalia.getChildren().length, 0 )
    })

    it( 'add', () => {
      const animalia = Tree( { name: 'Animalia' } )
      const chordata = Tree( { name: 'Chordata' } )
      const arthropoda = Tree( { name: 'Arthropoda' } )

      animalia.add( chordata )

      assert.equal( animalia.getChildren().length, 1 )

      animalia.add( arthropoda, chordata )

      assert.equal( animalia.getChildren().length, 2 )
      assert.equal( animalia.firstChild(), arthropoda )
    })
  })

  describe( 'default plugins', () => {
    it( 'id', () => {
      const animalia = Tree( { name: 'Animalia' } )
      const chordata = Tree( { name: 'Chordata' } )
      const arthropoda = Tree( { name: 'Arthropoda' } )

      animalia.add( chordata )
      animalia.add( arthropoda )

      const ids = {}

      animalia.walk( current => {
        const { name } = current.getValue()
        const id = current.id()

        ids[ name ] = id
      })

      animalia.walk( current => {
        const { name } = current.getValue()
        const id = current.id()

        assert.equal( ids[ name ], id )
      })
    })

    it( 'getValue', () => {
      const root = Tree( { name: 'Animalia' } )

      assert.deepEqual( root.getValue(), { name: 'Animalia' } )
      assert.deepEqual( root.value(), { name: 'Animalia' } )
      assert.equal( root.getValue( 'name' ), 'Animalia' )
    })

    it( 'setValue', () => {
      const root = Tree( { name: 'Animalia' } )

      root.setValue( { name: 'Chordate' } )

      assert.deepEqual( root.getValue(), { name: 'Chordate' } )

      root.setValue( 'name', 'Animalia' )

      assert.deepEqual( root.getValue(), { name: 'Animalia' } )
    })

    it( 'assign', () => {
      const root = Tree( { name: 'Animalia' } )

      root.assign( { name: 'Chordate' } )

      assert.deepEqual( root.getValue(), { name: 'Chordate' } )

      root.assign( { id: 'root' } )

      assert.deepEqual( root.getValue(), { name: 'Chordate', id: 'root' } )
    })

    it( 'nodeType', () => {
      const root = Tree( { name: 'Animalia' } )

      assert.equal( root.nodeType(), 'node' )

      root.setValue( 'nodeType', 'biology' )

      assert.equal( root.nodeType(), 'biology' )
    })
  })

  describe( 'Plugin factory', () => {
    const { Factory } = Tree

    const nameAndIdModule = ( node, state ) => ({
      nameAndId: () => {
        const { name } = node.getValue()
        const id = node.id()

        return name + ' ' + id
      }
    })

    const lowerNameModule = node => ({
      lowerName: () => node.getValue( 'name' ).toLowerCase()
    })

    it( 'Adds plugin', () => {
      const PTree = Factory( nameAndIdModule )

      const animalia = PTree( { name: 'Animalia' } )
      const chordata = PTree( { name: 'Chordata' } )
      const arthropoda = PTree( { name: 'Arthropoda' } )

      animalia.add( chordata )
      animalia.add( arthropoda )

      const ids = {}

      animalia.walk( current => {
        const { name } = current.getValue()
        const id = current.id()

        assert.equal( current.nameAndId(), name + ' ' + id )
      })
    })

    it( 'Adds plugins as array', () => {
      const PTree = Factory( [ nameAndIdModule, lowerNameModule ] )

      const animalia = PTree( { name: 'Animalia' } )

      assert( is.string( animalia.nameAndId() ) )
      assert.equal( animalia.lowerName(), 'animalia' )
    })

    it( 'Allows options', () => {
      const Tree1 = Factory( nameAndIdModule, { exposeState: true } )
      const Tree2 = Factory( { exposeState: true } )

      const tree1 = Tree1( { name: 'Animalia' } )
      const tree2 = Tree2( { name: 'Animalia' } )

      assert( is.object( tree1.state ))
      assert( is.object( tree2.state ))
    })

    it( 'parseState', () => {
      const parseState = ( Tree, ...args ) => {
        if( args.length === 2 && args.every( is.string ) ){
          const value = { name: args[ 0 ], id: args[ 1 ] }
          const rawNode = Tree.createNode( value )
          return { node: rawNode, root: rawNode, parent: null }
        }

        if( is.string( args[ 0 ] ) ){
          const value = { name: args[ 0 ] }
          const rawNode = Tree.createNode( value )
          return { node: rawNode, root: rawNode, parent: null }
        }
      }

      const Tree = Factory( { stateParsers: [ parseState ] } )

      const tree1 = Tree( { name: 'Animalia' } )
      const tree2 = Tree( 'Animalia' )
      const tree3 = Tree( 'Animalia', 'root' )

      assert.equal( tree1.getValue( 'name' ), 'Animalia' )
      assert.equal( tree2.getValue( 'name' ), 'Animalia' )
      assert.equal( tree3.getValue( 'name' ), 'Animalia' )
      assert.equal( tree3.getValue( 'id' ), 'root' )
    })
  })
})
