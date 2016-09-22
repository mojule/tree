'use strict'

const fnDefs = require( '../fn-defs' )

const wrapFn = ( fn, def, root, currentNode, wrapNode ) => {
  const unwrapNodes = ( args, count ) => {
    for( let i = 0; i < count; i++ ){
      args[ i ] = args[ i ].get()
    }
  }

  const setArgs = {
    node : ( args, count ) => {
      unwrapNodes( args, count )

      return [ currentNode ].concat( args )
    },

    root: ( args, count ) => {
      unwrapNodes( args, count )

      return [ root, currentNode ].concat( args )
    },

    callback: args => {
      const cb = args[ 0 ]

      const wrapped = ( ...args ) => {
        args[ 0 ] = wrapNode( args[ 0 ] )

        if( args[ 1 ] )
          args[ 1 ] = wrapNode( args[ 1 ] )

        return cb.apply( cb, args )
      }

      args[ 0 ] = wrapped

      return [ currentNode ].concat( args )
    },

    rootCallback: args => {
      const cb = args[ 0 ]

      const wrapped = ( ...args ) => {
        args[ 0 ] = wrapNode( args[ 0 ] )

        if( args[ 1 ] )
          args[ 1 ] = wrapNode( args[ 1 ] )

        return cb.apply( cb, args )
      }

      args[ 0 ] = wrapped

      return [ root, currentNode ].concat( args )
    },

    nodePredicate: args => {
      const predicate = args[ 0 ]

      args[ 0 ] = node => predicate( wrapNode( node ) )

      return [ currentNode ].concat( args )
    },

    rootPredicate: args => {
      const predicate = args[ 0 ]

      args[ 0 ] = node => predicate( wrapNode( node ) )

      return [ root, currentNode ].concat( args )
    },

    default: args => args
  }

  const setResult = {
    node: result => wrapNode( result ),
    nodeList: result => result.map( wrapNode ),
    default: result => result
  }

  const wrapped = ( ...args ) => {
    const argType = def.argType || 'default'
    const count = def.extraNodeArgs || 0
    const resultType = def.returnType || 'default'

    const fnArgs = setArgs[ argType ]( args, count )
    const result = fn.apply( fn, fnArgs )

    return setResult[ resultType ]( result )
  }

  return wrapped
}

const apiPlugin = tree => {
  const api = ( root, defs ) => {
    defs = defs || fnDefs

    const memo = new Map()

    const wrapNode = node => {
      if( memo.has( node ) ) return memo.get( node )

      const api = Object.keys( tree ).reduce( ( api, key ) => {
        const fn = tree[ key ]

        // if current fn is in defs wrap else pass through untouched
        api[ key ] = defs[ key ] ?
          wrapFn( fn, defs[ key ], root, node, wrapNode ) :
          fn

        return api
      }, {})

      // get underlying node
      api.get = () => node
      api.getRoot = () => wrapNode( root )

      memo.set( node, api )

      return api
    }

    return wrapNode( root )
  }

  return { api }
}

apiPlugin.requirements = [ 'createNode' ]

module.exports = apiPlugin
