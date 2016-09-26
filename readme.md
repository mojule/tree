# 1tree

![1tree](./1tree.png)

> *One tree to rule them all, one walk to find them,*
> *One tree to bring them all and in the node graph bind them.*

## A functional API for traversing and manipulating tree structures

- extensive traversal and manipulation API (comparable to DOM or jQuery)
- provide an adapter to any other tree structure by implementing a few simple functions and get the rest of the API for free
- supports plugins to extend or modify functionality
- small footprint, no external dependencies, fast
- optimised for large graphs, full test suite

## Quick start

Create a basic tree where each node is just a string:

```javascript
const tree = require( '1tree' )

const root = tree( 'Animalia' )
const chordata = tree.createNode( 'Chordata' )

root.append( chordata )

root.walk( n => console.log( n.value() ) )
```

## API

### Basics

Create a tree:

```javascript
const root = tree( rootValue )
```

Create a node:

```javascript
const node = root.createNode( value )
```

Get the node's underlying implementation:

```javascript
const realNode = node.get()
```

Get a node's value:

```javascript
const value = node.value()
```

Set a node's value:

```javascript
node.value( 'something' )
```

Note that the value that you give a node can be anything, but I highly
recommend that you use only JSON-serializable objects, it makes your resultant
graph more useful as you can easily pass it over the wire, store it in a
database etc.

For most of the examples we just use a string as the node's value.

A contrived example using object literals:

```javascript
const root = tree({
  fileType: 'folder'
  name: 'Photos'
})

const selfie = root.createNode({
  fileType: 'file',
  name: 'selfie.jpg'
})

root.append( selfie )
```

### Traversal

The comment above each API method example is the function signature in
[rtype](https://github.com/ericelliott/rtype) notation

#### getChildren

Get the child nodes of the current node

```javascript
// getChildren() => [Node]

const children = node.getChildren()
```

#### childAt

Gets the child at the specified index

```javascript
// childAt( index: Integer ) => childNode: Node

const second = node.childAt( 2 )
```

#### firstChild

Get the first child of the current node

```javascript
// firstChild() => childNode: Node

const first = node.firstChild()
```

#### lastChild

Get the last child of the current node

```javascript
// lastChild() => childNode: Node

const last = node.lastChild()
```

#### walk

Do a depth-first traversal of the tree starting at the current node

```javascript
// walk( callback: Function ) => Void

node.walk( n => console.log( n.value() ) )
```

The callback is passed the current node, the parent of the current node, and the
depth relative to the inital node. You can halt the walk by returning a truthy
value from your callback.

```javascript
// callback( current: Node, parent: Node, depth: Integer ) => stop: Boolean

node.walk( ( current, parent, depth ) => {
  console.log( current.value(), parent.value() )

  if( depth > 5 ) return true
})
```

#### walkUp

Traverses the tree upwards from the current node, performing a callback on each
parent until it reaches the root of the tree or the callback returns a truthy
value. The traversal starts from the current node.

```javascript
// walkUp( callback: Function ) => Void

node.walkUp( n => console.log( n.value() ) )
```

The callback is passed only the current node:

```javascript
// callback( current: Node ) => stop: Boolean

node.walkUp( n => {
  const value = n.value()

  console.log( value )

  if( value === 'Some Value' ) return true
})
```

#### find

Traverses the tree from the current node and returns the first node matching a
passed in predicate function.

```javascript
// find( test: Predicate ) => Node

const target = node.find( n => n.value() === 'Some Value' )

console.log( target.value() )
```

#### findAll

Traverses the tree from the current node and returns all nodes matching a
passed in predicate function.

```javascript
// findAll( test: Predicate ) => [Node]

const targets = node.findAll( n => n.value() === 'Some Value' )

targets.forEach( n => console.log( n.value() ) )
```

#### getParent

Gets the parent of the current node

```javascript
// getParent() => parentNode: Node

const parent = node.getParent()
```

#### closest

Finds the first node matching the passed in predicate, traversing upwards from
the current node

```javascript
// closest( test: Predicate ) => Node

const target = node.closest( n => n.value() === 'Some Value' )

console.log( target.value() )
```

#### ancestors

Returns a list of all ancestors of the current node, where the head of the list
is the current node's parent and the tail is the root node.

```javascript
// ancestors() => [Node]

const ancestors = node.ancestors()

ancestors.forEach( n => console.log( n.value() ) )
```

#### nextSibling

Returns the next sibling of the current node, or `undefined` if the current node
is the last child.

```javascript
// nextSibling() => siblingNode: Node

const next = node.nextSibling()

if( next ){
  console.log( 'Next sibling value is', next.value() )
} else {
  console.log( 'Current node is last child' )
}
```

#### previousSibling

Returns the previous sibling of the current node, or `undefined` if the current node
is the first child.

```javascript
// previousSibling() => siblingNode: Node

const prev = node.previousSibling()

if( prev ){
  console.log( 'Previous sibling value is', prev.value() )
} else {
  console.log( 'Current node is first child' )
}
```

#### siblings

Returns all siblings of the current node, excluding the current node. If the
current node is the only child of its parent, an empty array is returned.

```javascript
// siblings() => [Node]

const siblings = node.siblings()

siblings.forEach( n => console.log( n.value() ) )
```

#### descendents

Returns all of a node's children, their children etc. as a flat array in depth
first order. Returns an empty array if the node has no children.

```javascript
// descendents() => [Node]

const descendents = node.descendents()

descendents.forEach( n => console.log( n.value() ) )
```

#### contains

Returns a boolean indicating whether a node matching the predicate was found,
searching from the current node downwards.

```javascript
// contains( test: Predicate ) => Boolean

const hasValue = node.contains( n => n.value() === 'Some Value' )
```

#### hasChildren

Returns a boolean indicating whether or not the current node has any children,
or false if it doesn't (is a leaf node).

```javascript
// hasChildren() => Boolean

const hasChildren = node.hasChildren()
```

### Manipulation

#### append

Adds the new node to the tail end of the current node's child list. If the
node already has a parent, it is removed from that parent's child list. Returns
the node that was appended.

```javascript
// append( newNode: Node ) => newNode: Node

node.append( newNode )
```

#### insertBefore

Inserts a new node into the current node's child list, before the node
provided as a reference node. If the new node already has a parent, it is
removed from that parent's child list. Returns the node that was inserted.

```javascript
// insertBefore( newNode: Node, referenceNode: Node ) => Node

node.insertBefore( newNode, referenceNode )
```

#### remove

Removes the current node from its parent. Returns the current node.

```javascript
// remove() => removedNode: Node

const parent = node.getParent()

console.log( parent.getChildren().length )

node.remove()

console.log( parent.getChildren().length )
```

#### replaceChild

Replaces the reference node in the parent's child list with the new node. If
the new node already has a parent, it is removed from that parent's child list.
Returns the node that was replaced.

```javascript
// replaceChild( newNode: Node, referenceNode: Node ) => replacedNode: Node

parentNode.replaceChild( newNode, referenceNode )
```

#### insertAt

Inserts a new node into the current node's child list, at the index
specified. If the new node already has a parent, it is removed from that
parent's child list. Returns the node that was inserted.

```javascript
// insertAt( newNode: Node, index: Integer ) => newNode: Node

parentNode.insertAt( newNode, 2 )
```

#### insertAfter

Inserts a new node into the current node's child list, after the node
provided as a reference node. If the new node already has a parent, it is
removed from that parent's child list. Returns the node that was inserted.

```javascript
// insertAfter( newNode: Node, referenceNode: Node ) => newNode: Node

node.insertAfter( newNode, referenceNode )
```

#### removeAt

Removes the child of the current node at the specified index. Returns the
removed node.

```javascript
// removeAt( index: Integer ) => removedNode: Node

const removedNode = node.removeAt( 2 )
```

#### empty

Removes all of the current node's children. Returns an array of the removed
children.

```javascript
// empty() => removedNodes: [Node]

console.log( node.getChildren().length )

const removed = node.empty()

console.log( node.getChildren().length )
```

#### prepend

Adds the new node to the head of the current node's child list. Returns the new
node.

```javascript
// prepend( newNode: Node ) => newNode: Node

node.prepend( newNode )
```

#### unwrap

Replaces the parent of the current node with the current node and its siblings.
Returns the removed parent node.

```javascript
// unwrap() => removedParentNode: Node

const oldParent = node.unwrap()
```

#### wrap

Replaces the current node with the new node, and then adds the current node to
the new node's child list. Returns the new node.

```javascript
// wrap( newParent: Node ) => newParent: Node

node.wrap( newParentNode )
```

### Miscellaneous

#### get

Gets the node's underlying implementation - for example when using the DOM
adapter it would probably refer to an HTMLElement or similar

```javascript
// get() => Any
const divElement = div.get()

console.log( divElement.tagName ) // "div"
```

#### serialize

Returns a single object containing the current node and all of its children,
where each node looks like:

```json
{
  "value": ...,
  "children": [...]
}
```

Where possible you should ensure that the values you assign to nodes are
JSON-serializable objects, it will make your life a *lot* easier.

```javascript
// serialize() => Object

const myTree = node.serialize()

db.save( 'myTree', myTree )
```

#### deserialize

Takes an object of the following form and returns a node:

```json
{
  "value": ...,
  "children": [...]
}
```

```javascript
// deserialize( obj: Object ) => Node

const obj = db.load( 'myTree' )
const node = tree.deserialize( obj )
```

## adapters

```javascript
const domTree = tree.adapter( domAdapter )
const root = domTree( 'My page title' )
```

## creating an adapter

You can create adapters that allow you to use the API over any tree-like backing
structure.

You need to provide between 1 and 5 functions for the adapter to work. If you
only provide `getChildren`, you will get the whole traversal API, but the
manipulation API requires `insertBefore` and `remove`. The serializer
functions require `value` and `createNode`.

You can also provide implementations of other functions normally provided by the
API, for example your underlying data structure may already have a more efficient
way of getting the parent of a node than the API does.

These functions differ slightly from the consumer versions in the 1tree API in
that they take more arguments (the API curries the extra arguments) - the
signatures are shown here in [rtype](https://github.com/ericelliott/rtype) format:

The `fn` argument will pass you in the tree API, so that you can call other API
primitives from your adapter:

```
getChildren( node: Node ) => [Node]
/*
  children should be an array, even if the underlying implementation is not, for
  example the DOM returns a variety of array-like objects, you should convert
  these to an array
*/

insertBefore( fn: Object[Function], rootNode: Node, currentNode: Node, newNode: Node, referenceNode: Node ) => newNode: Node
/*
  If referenceNode is not provided you should append the new node to the tail
  end of the current node's children instead. You should remove the new node
  from it's current parent if it already has one.
  (eg. fn.remove( fn, root, newNode ) ).
*/

remove( fn: Object[Function], rootNode: Node, currentNode: Node ) => removedNode: Node
/*
  fn is provided in case you need to for example, find the parent via
  fn.getParent or etc.
*/

value( currentNode: Node, value?: Any ) => value: Any
/*
  If called without the value parameter, it should return the "value" of the
  current node.

  If the value parameter is provided, it should set the "value" of the current
  node.

  It is best to have "value" be an abstraction of the underlying data stucture,
  and it is also wise to have that abstraction be JSON-serializable.

  For example, rather than returning an underlying DOM node directly, I would
  abstract it as:

  {
    "nodeType": 1,
    "tagName": "div",
    "attributes": [
      {
        "name": "id",
        "value": "myDiv"
      }
    ]
  }
*/
```

For an example, [see the DOM adapter](./test/fixtures/dom.js)

## plugins

A plugin is implemented as a function that takes the current tree API and adds
to it, deletes from it, wraps an existing function etc.

### using a plugin

```javascript
const tree = require( '1tree' )
const logPlugin = require( './log-plugin.js' )

tree.plugin( logPlugin )

const root = tree( 'Animalia' )

root.log()
```

### implementing a plugin

If your plugin attaches functions to the fn object, you should also attach a
`def` object to each of those functions which provides some metadata so that
your plugin can be used from a wrapped node. See the [defs folder](./src/defs)
for examples of `def` in the built in functions.

```javascript
const logPlugin = fn => {
  const log = node => {
    console.log( fn.value( node ) )

    return node
  }

  log.def = {
    argTypes: [ 'node' ],
    returnType: 'node',
    requires: [ 'value' ],
    categories: [ 'log-plugin', 'plugin' ]
  }

  fn.log = log

  return fn
}
```

## future

How to traverse when nodes may require async or events?

Can an adapter or plugin be built that wraps all function calls to be async
where necessary using similar technique to the `wrap-nodes` plugin?
