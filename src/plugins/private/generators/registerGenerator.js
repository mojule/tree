'use strict'

const registerGenerator = ({ privates }) => {
  const generatorNames = new Set()

  privates.registerGenerator = name => generatorNames.add( name )

  Object.defineProperty( privates, 'generatorNames', {
    get: () => Array.from( generatorNames )
  })
}

module.exports = registerGenerator
