'use strict'

const registerGenerator = ({ privates }) => {
  const generatorNames = new Set()

  privates.registerGenerator = name => generatorNames.add( name )

  privates.registerGet({
    target: privates,
    name: 'generatorNames',
    get: () =>  Array.from( generatorNames )
  })
}

module.exports = registerGenerator
