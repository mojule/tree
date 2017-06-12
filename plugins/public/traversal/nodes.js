'use strict'

const is = require( '@mojule/is' )

const nodes = ( api, state, core, privates ) => {
  privates.generatorNames.forEach( name => {
    const generator = privates[ name ]
    const fname = `${ name }Nodes`

    Object.defineProperty( api, fname, {
      get: () => privates.nodeList( generator )
    })
  })
}

module.exports = nodes
