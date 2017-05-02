'use strict'

const exposeProperties = propertyNames => {
  const plugin = node => {
    return propertyNames.reduce( ( api, name ) => {
      api[ name ] = () => node.getValue( name )

      return api
    }, {} )
  }

  return plugin
}

module.exports = exposeProperties
