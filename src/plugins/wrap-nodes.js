'use strict'

const signatureToDef = sig => {
  const segs = sig.split( '=>' )
  const argTypes = segs[ 0 ].replace( '(', '' ).replace( ')', '' ).split( ',' ).map( arg => arg.trim() )
  const returnType = segs[ 1 ].trim()

  return { argTypes, returnType }
}

const argsMap = ( fn, argTypes, map ) => ( ...args ) => {
  const wrappedArgs = argTypes.map( ( typeName, i ) => {
    const value = args[ i ]

    if( map[ typeName ] ){
      return map[ typeName ]( value )
    }

    return value
  })

  return fn( ...wrappedArgs )
}

const wrapNodes = fn => {
  const fnames = Object.keys( fn )

  const wrappedFn = ( root, node, fname ) => ( ...args ) => {
    const func = fn[ fname ]
    const def = func.def || {}
    const argTypes = def && Array.isArray( def.argTypes ) ? def.argTypes : []

    let firstNode = false

    const curryMap = {
      fn: () => fn,
      rootNode: () => root,
      node: () => {
        if( !firstNode ){
          firstNode = true
          return node
        }

        return args.shift().get()
      },
      any: () => args.shift()
    }

    const argMap = {
      rootNode: n => wrappedNode( root, n ),
      node: n => wrappedNode( root, n )
    }

    const curried = argTypes.map( t => {
      if( curryMap[ t ] ) return curryMap[ t ]()

      if( t.indexOf( '=>' ) !== -1 ){
        const def = signatureToDef( t )
        const fnArg = args.shift()

        return argsMap( fnArg, def.argTypes, argMap )
      }

      return curryMap.any()
    })

    let result = func( ...curried )

    if( def.returnType === 'node' ){
      result = wrappedNode( root, result )
    } else if( def.returnType === '[node]' ){
      result = result.map( n => wrappedNode( root, n ) )
    }

    return result
  }

  const wrappedNode = ( root, node ) => {
    if( node === null || node === undefined )
      return node

    const wrapped = fnames.reduce( ( wrappedNode, fname ) => {
      wrappedNode[ fname ] = wrappedFn( root, node, fname )

      return wrappedNode
    }, {} )

    wrapped.get = () => node
    wrapped.getRoot = () => root

    return wrapped
  }

  const createTree = root => wrappedNode( root, root )

  createTree.def = {
    argTypes: [ 'nodeValue' ],
    returnType: 'wrappedNode',
    requires: [ 'createNode' ],
    categories: [ 'wrapped-nodes', 'plugin' ]
  }

  return Object.assign( fn, { createTree } )
}

module.exports = wrapNodes
