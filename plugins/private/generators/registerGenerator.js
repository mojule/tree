'use strict'

const registerGenerator = ( api, state, core ) => {
  const generatorNames = new Set()

  api.registerGenerator = name => generatorNames.add( name )

  Object.defineProperty( api, 'generatorNames', {
    get: () => Array.from( generatorNames )
  })
}

module.exports = registerGenerator
