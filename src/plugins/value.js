'use strict'

const is = require( '@mojule/is' )

const valueModule = ( node, state ) => {
  const { getValue, setValue, value } = node

  return {
    getValue: propertyName => {
      if( is.undefined( propertyName ) )
        return getValue()

      const value = getValue()

      return value[ propertyName ]
    },
    setValue: ( arg, propertyValue ) => {
      if( is.object( arg ) )
        return setValue( arg )

      const existing = getValue()

      existing[ arg ] = propertyValue

      return setValue( existing )
    },
    assign : value => {
      const existing = getValue()

      return setValue( Object.assign( {}, existing, value ) )
    }
  }
}

module.exports = valueModule
