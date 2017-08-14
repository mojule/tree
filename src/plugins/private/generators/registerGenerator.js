'use strict'

const registerGenerator = ({ privates, core }) => {
  const generatorNames = new Set()

  privates.registerGenerator = name => generatorNames.add( name )

  core.registerProperty({
    target: privates,
    name: 'generatorNames',
    get: () =>  Array.from( generatorNames )
  })
}

module.exports = registerGenerator
