'use strict'

const is = require( '@mojule/is' )

const nodes = ({ api, state, core, privates }) => {
  privates.generatorNames.forEach( name => {
    const generator = privates[ name ]
    const fname = `${ name }Nodes`
    const list = core.nodeList( generator )

    core.registerProperty({
      target: api,
      name: fname,
      get: () => list
    })
  })
}

module.exports = nodes
