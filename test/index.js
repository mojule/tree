'use strict'

const assert = require( 'assert' )
const Tree = require( '../src' )
const biologyTree = require( './fixtures/biology' )

describe( 'default tree', () => {
  it( 'should create a tree', () => {
    const root = Tree.createRoot( 'Root' )

    assert( root.getChildren )
  })

  it( 'should get value', () => {
    const root = biologyTree( Tree )

    assert.equal( root.value(), 'Animalia' )
  })

  it( 'should set value', () => {
    const root = biologyTree( Tree )

    root.value( 'Animals' )

    assert.equal( root.value(), 'Animals' )
  })

  it( 'should get children', () => {
    const root = biologyTree( Tree )

    const children = root.getChildren()

    assert( Array.isArray( children ) )

    //children are wrapped?
    const first = children[ 0 ]
    assert( typeof first.get === 'function' )
  })

  it( 'should walk', () => {
    const root = biologyTree( Tree )

    root.walk( ( node, parent, depth ) => {
      assert( typeof node.get === 'function' )

      if( parent )
        assert( typeof parent.get === 'function' )

      assert( typeof depth === 'number' )
    })
  })

  it( 'should find', () => {
    const root = biologyTree( Tree )

    const human = root.find( n => n.value() === 'Human' )

    assert( typeof human.get === 'function' )
  })

  it( 'should get parent', () => {
    const root = biologyTree( Tree )

    const human = root.find( n => n.value() === 'Human' )

    const parent = human.getParent()

    assert( typeof parent.get === 'function' )
    assert( parent.value() === 'Sapiens' )
  })

  it( 'should get child at index', () => {
    const root = biologyTree( Tree )

    const secondChild = root.childAt( 1 )

    assert( typeof secondChild.get === 'function' )
    assert( secondChild.value() === 'Arthropoda' )
  })

  it( 'should get first child', () => {
    const root = biologyTree( Tree )

    const first = root.firstChild()

    assert( typeof first.get === 'function' )
    assert( first.value() === 'Chordate' )
  })

  it( 'should get last child', () => {
    const root = biologyTree( Tree )

    const last = root.lastChild()

    assert( typeof last.get === 'function' )
    assert( last.value() === 'Arthropoda' )
  })

  it( 'should get next sibling', () => {
    const root = biologyTree( Tree )

    const first = root.firstChild()
    const next = first.nextSibling()

    assert( typeof next.get === 'function' )
    assert( next.value() === 'Arthropoda' )
  })

  it( 'should get previous sibling', () => {
    const root = biologyTree( Tree )

    const last = root.lastChild()
    const prev = last.previousSibling()

    assert( typeof prev.get === 'function' )
    assert( prev.value() === 'Chordate' )
  })

  it( 'should find closest ancestor matching predicate', () => {
    const root = biologyTree( Tree )

    const human = root.find( n => n.value() === 'Human' )

    const homo = human.closest( n => n.value() === 'Homo' )

    assert( typeof homo.get === 'function' )
    assert( homo.value() === 'Homo' )
  })

  it( 'should get all ancestors', () => {
    const root = biologyTree( Tree )

    const human = root.find( n => n.value() === 'Human' )

    const ancestors = human.ancestors()

    assert( Array.isArray( ancestors ) )
    assert.equal( ancestors.length, 7 )
    assert( typeof ancestors[ 0 ].get === 'function' )
  })

  it( 'should get siblings', () => {
    const root = biologyTree( Tree )

    const first = root.firstChild()

    const siblings = first.siblings()

    assert( Array.isArray( siblings ) )
    assert.equal( siblings.length, 1 )
    assert( typeof siblings[ 0 ].get === 'function' )
    assert.equal( siblings[ 0 ].value(), 'Arthropoda' )
  })

  it( 'should find all', () => {
    const root = biologyTree( Tree )

    const h = root.findAll( n => n.value().charAt( 0 ) === 'H' )

    assert( Array.isArray( h ) )
    assert.equal( h.length, 5 )
    assert( typeof h[ 0 ].get === 'function' )
  })

  it( 'should get descendents', () => {
    const root = biologyTree( Tree )

    const hominidae = root.find( n => n.value() === 'Hominidae' )

    const descendents = hominidae.descendents()

    assert( Array.isArray( descendents ) )
    assert.equal( descendents.length, 3 )
    assert.equal( descendents[ 2 ].value(), 'Human' )
    assert( typeof descendents[ 0 ].get === 'function' )
  })

  it( 'should test contains', () => {
    const root = biologyTree( Tree )

    const hominidae = root.find( n => n.value() === 'Hominidae' )

    assert( hominidae.contains( n => n.value() === 'Human' ) )
    assert( !hominidae.contains( n => n.value() === 'Chimpanzee' ) )
  })

  it( 'should test has children', () => {
    const root = biologyTree( Tree )

    const hominidae = root.find( n => n.value() === 'Hominidae' )
    const human = root.find( n => n.value() === 'Human' )

    assert( hominidae.hasChildren() )
    assert( !human.hasChildren() )
  })

  it( 'should create a node', () => {
    const node = Tree.createRoot( 'New Node' )

    assert( typeof node.get === 'function' )
    assert.equal( node.value(), 'New Node' )
  })

  it( 'should append a child', () => {
    const root = Tree.createRoot( 'Root' )
    const node = root.createNode( 'New Node' )

    root.append( node )

    const nodeParent = node.getParent()
    const rootChild = root.getChildren()[ 0 ]

    assert.equal( nodeParent.value(), 'Root' )
    assert.equal( rootChild.value(), 'New Node' )

    //ensure appending removes from original parent too
    const node2 = root.createNode( 'New Node 2' )

    root.append( node2 )
    node2.append( node )

    assert.equal( root.getChildren().length, 1 )
    assert.equal( root.getChildren()[ 0 ].value(), 'New Node 2' )
    assert.equal( node.getParent().value(), 'New Node 2' )
  })

  it( 'should insert before', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( c )
    root.insertBefore( b, c )

    const children = root.getChildren()

    assert.equal( children[ 0 ].value(), 'A' )
    assert.equal( children[ 1 ].value(), 'B' )
    assert.equal( children[ 2 ].value(), 'C' )
  })

  it( 'should remove', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( b )
    root.append( c )

    const before = root.getChildren().length

    b.remove()

    const after = root.getChildren().length

    assert.equal( before, 3 )
    assert.equal( after, 2 )
  })

  it( 'should replace child', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )
    const oldB = root.createNode( 'Old B' )

    root.append( a )
    root.append( oldB )
    root.append( c )

    root.replaceChild( b, oldB )

    assert.equal( root.getChildren().length, 3 )
    assert.equal( root.getChildren()[ 1 ].value(), 'B' )
  })

  it( 'should insert at', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( c )

    root.insertAt( b, 1 )
    assert.equal( root.getChildren().length, 3 )
    assert.equal( root.getChildren()[ 1 ].value(), 'B' )
  })

  it( 'should insert after', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( c )

    root.insertAfter( b, a )
    assert.equal( root.getChildren().length, 3 )
    assert.equal( root.getChildren()[ 1 ].value(), 'B' )
  })

  it( 'should remove at index', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( b )
    root.append( c )

    root.removeAt( 1 )
    assert.equal( root.getChildren().length, 2 )
    assert.equal( root.getChildren()[ 1 ].value(), 'C' )
  })

  it( 'should empty a node', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( b )
    root.append( c )

    root.empty()
    assert.equal( root.getChildren().length, 0 )
  })

  it( 'should prepend a node', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( b )
    root.append( c )

    root.prepend( a )

    assert.equal( root.getChildren()[ 0 ].value(), 'A' )
  })

  it( 'should unwrap a node', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const bWrapper = root.createNode( 'B Wrapper' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( bWrapper )
    root.append( c )

    bWrapper.append( b )

    b.unwrap()

    assert.equal( root.getChildren()[ 1 ].value(), 'B' )
  })

  it( 'should wrap a node', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const bChild = root.createNode( 'B Child' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )

    root.append( a )
    root.append( bChild )
    root.append( c )

    bChild.wrap( b )

    assert.equal( root.getChildren()[ 1 ].value(), 'B' )
    assert.equal( b.getChildren()[ 0 ].value(), 'B Child' )
  })

  it( 'should serialize', () => {
    const root = Tree.createRoot( 'Root' )

    const a = root.createNode( 'A' )
    const b = root.createNode( 'B' )
    const c = root.createNode( 'C' )
    const bChild = root.createNode( 'B Child' )

    root.append( a )
    root.append( b )
    root.append( c )

    b.append( bChild )

    const serialized = root.serialize()

    const shouldBe = {
      value: 'Root',
      children: [
        {
          value: 'A',
          children: []
        },
        {
          value: 'B',
          children: [
            {
              value: 'B Child',
              children: []
            }
          ]
        },
        {
          value: 'C',
          children: []
        }
      ]
    }

    assert.deepEqual( serialized, shouldBe )
  })
})

describe( 'dom adapter', () => {
  const document = require( 'jsdom' ).jsdom()
  const domAdapter = require( './fixtures/dom' )

  const DomTree = domAdapter( document )

  const getBody = root => root.find( n => {
    const value = n.value()

    return value.nodeType === 1 && value.tagName === 'BODY'
  })

  const h = tagName => DomTree.createRoot({
    nodeType: 1,
    tagName
  })

  const doc = title => DomTree.createRoot({
    nodeType: 9,
    isPrepopulated: true,
    title
  })

  it( 'should create a node', () => {
    const div = h( 'div' ).get()

    assert.equal( '<div></div>', div.outerHTML )
  })

  it( 'should find a node', () => {
    const $ = doc( 'Test' )
    const body = getBody( $ ).get()

    assert.equal( body.tagName, 'BODY' )
  })

  it( 'should append a child', () =>{
    const $ = doc( 'Test' )
    const $body = getBody( $ )
    const $div = h( 'div' )

    $body.append( $div )

    const body = $body.get()

    assert.equal( body.innerHTML, '<div></div>' )
  })

  it( 'should insert a child', () =>{
    const $ = doc( 'Test' )
    const $body = getBody( $ )
    const $div = h( 'div' )
    const $p = h( 'p' )

    $body.append( $div )
    $body.append( $p )

    const $span = h( 'span' )

    $body.insertBefore( $span, $p )

    const body = $body.get()

    assert.equal( body.innerHTML, '<div></div><span></span><p></p>' )
  })

  it( 'should remove a child', () =>{
    const $ = doc( 'Test' )

    const $body = getBody( $ )

    const $div = h( 'div' )
    const $p = h( 'p' )

    $body.append( $div )
    $body.append( $p )

    const body = $body.get()

    assert.equal( body.innerHTML, '<div></div><p></p>' )

    $p.remove()

    assert.equal( body.innerHTML, '<div></div>' )
  })

  it( 'should set element attributes', () => {
    const $div = h( 'div' )

    $div.value({ attributes: [{ name: 'id', value: 'test' }] })

    assert.equal( '<div id="test"></div>', $div.get().outerHTML )

    const value = $div.value()

    assert.equal( value.nodeType, 1 )
    assert.equal( value.tagName, 'DIV' )
    assert.deepEqual( value.attributes,  [{ name: 'id', value: 'test' }] )
  })

  it( 'should create a text node', () => {
    const $text = DomTree.createRoot({
      nodeType: 3,
      nodeValue: 'Hello, world!'
    })

    const text = $text.get()

    assert.equal( text.nodeType, 3 )
    assert.equal( text.nodeValue, 'Hello, world!' )

    $text.value({ nodeValue: 'Test' })

    const value = $text.value()

    assert.equal( value.nodeType, 3 )
    assert.equal( value.nodeValue, 'Test' )
  })

  it( 'should create a comment node', () => {
    const $comment = DomTree.createRoot({
      nodeType: 8,
      nodeValue: 'Hello, world!'
    })

    const $div = h( 'div' )

    $div.append( $comment )

    assert.equal( $div.get().innerHTML, '<!--Hello, world!-->' )

    $comment.value({ nodeValue: 'Test' })

    const value = $comment.value()

    assert.equal( value.nodeType, 8 )
    assert.equal( value.nodeValue, 'Test' )
    assert.equal( $div.get().innerHTML, '<!--Test-->' )
  })

  it( 'should create a document', () => {
    const $ = doc( 'Test' )

    const documentElement = $.get().documentElement

    assert.equal( '<html><head><title>Test</title></head><body></body></html>', documentElement.outerHTML )

    const value = $.value()

    assert.equal( value.nodeType, 9 )
  })

  it( 'should create a document type', () => {
    const $doctype = DomTree.createRoot({
      nodeType: 10,
      publicId: 'html'
    })

    assert.equal( $doctype.get().publicId, 'html' )
  })

  it( 'should create a document fragment', () => {
    const $fragment = DomTree.createRoot({
      nodeType: 11
    })

    const $div = h( 'div' )
    const $span = h( 'span' )

    $fragment.append( $span )
    $div.append( $fragment )

    assert.equal( '<div><span></span></div>', $div.get().outerHTML )
  })

  it( 'should be able to serialize to and from json', () => {
    const $ = doc( 'Test' )

    const serialized = $.serialize()

    const json = JSON.stringify( serialized )

    const obj = JSON.parse( json )

    const $deserialized = $.deserialize( obj )

    const rootHtml = getBody( $ ).get().outerHTML
    const deserializedHtml = getBody( $deserialized ).get().outerHTML

    assert.equal( rootHtml, deserializedHtml )
  })
})
