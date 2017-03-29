# tree

A functional API for creating, traversing, querying and manipulating trees

This is a ready-to-use implementation of a tree built with
[tree-factory](https://github.com/mojule/tree-factory), so most of the
documentation on the various traversal, querying etc. functions is provided
there, and see also the implementation section below

Use `tree-factory` if you want to supply your own adapter etc.

## Install

`npm install @mojule/tree`

## Usage

```javascript
const Tree = require( '@mojule/tree' )

const animalia = Tree( { name: 'Animalia' } )
const chordata = Tree( { name: 'Chordata' } )
const arthropoda = Tree( { name: 'Arthropoda' } )

animalia.add( chordata )
animalia.add( arthropoda )

animalia.walk( ( current, parent, depth ) => {
  const indent = '  '.repeat( depth )
  const { name } = current.getValue()

  console.log( indent + name )
})

/*
Animalia
  Chordata
  Arthropoda
*/
```

## Implementation

The [underlying adapter](/src/adapter.js) stores nodes in an array.

This implementation expects the node `value` to be an object. This allows for
some extra plugins, as follows:

### id

Lazy initialized unique IDs for nodes - when called, it will check if the node's
value has an `id` property, and if it does, return it.

If the value doesn't have an id property, a new id is generated from a random
GUID-like string prefixed by the node's `nodeType` and a hyphen.

```javascript
const node = Tree( { name: 'Animalia' } )

// something like 'node-dcef0534a6c23fd1b23001aed9f3c7f1'
console.log( node.id() )

// { name: 'Animalia', id: 'node-dcef0534a6c23fd1b23001aed9f3c7f1' }
console.log( node.getValue() )

const withId = Tree( { id: 'root' } )

// 'root'
console.log( node.id() )
```

### getValue

Because this implementation's value is always an object, the existing `getValue`
is extended to take an optional `propertyName` argument:

```javascript
const node = Tree( { name: 'Animalia' } )

// { name: 'Animalia' }
console.log( node.getValue() )

// 'Animalia'
console.log( node.getValue( 'name' ) )
```

### setValue

If `setValue` is passed an object as its first argument, it will behave like the
existing setValue implementation. If passed a string as its first value, it will
set that property on the value:

```javascript
const node = Tree( { name: 'Animalia' } )

node.setValue( { name: 'Chordate' } )

// { name: 'Chordate' }
console.log( node.getValue() )

node.setValue( 'name', 'Animalia' )

// { name: 'Animalia' }
console.log( node.getValue() )
```

### assign

A new plugin, this will `Object.assign` the existing value with a new value:

```javascript
const node = Tree( { name: 'Zygjx' } )

node.assign( { age: 437 } )

// { name: 'Zygjx', age: 437 }
console.log( node.getValue() )
```

## Plugins

To add plugins to this implementation:

```javascript
const Factory = require( '@mojule/tree' ).Factory
const plugins = require( './path/to/your/plugins' )

const Tree = Factory( plugins )
```

Creating plugins and various patterns for things like overriding existing and
extending existing functions, dependency injection etc. are described in the
documentation for [api-factory](https://github.com/mojule/api-factory), on which
`tree-factory` and in turn `tree` are built.
