'use strict'

const assert = require( 'assert' )
const Tree = require( '../dist' )

describe( 'Tree', () => {
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

  it( 'plugin factory', () => {
    const { Factory } = Tree

    const nameAndIdModule = ( node, state ) => ({
      nameAndId: () => {
        const { name } = node.getValue()
        const id = node.id()

        return name + ' ' + id
      }
    })

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
})
