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

This implementation expects the node `value` to be an object. It also provides
a plugin, `.id()`, which will return the id property of the value if it exists,
and if it doesn't, it will set it to a random id based on the `nodeType` and
then return that id.

The [underlying adapter](/src/adapter.js) stores nodes in an array.

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
