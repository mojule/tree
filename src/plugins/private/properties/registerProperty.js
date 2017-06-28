'use strict'

const registerProperty = ({ privates }) => {
  const propertyNames = new Set()

  privates.registerGet = ({
    target, name, get, enumerable = true, configurable = true
  }) => {
    propertyNames.add( name )

    Object.defineProperty( target, name, { get, enumerable, configurable } )
  }

  privates.registerProperty = ({
    target, name, get, set, enumerable = true, configurable = true
  }) => {
    propertyNames.add( name )

    Object.defineProperty( target, name, { get, set, enumerable, configurable } )
  }

  privates.registerGet({
    target: privates,
    name: 'propertyNames',
    get: () =>  Array.from( propertyNames )
  })
}

module.exports = registerProperty
