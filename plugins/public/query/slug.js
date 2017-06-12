'use strict'

const slug = ( api, state ) => {
  api.slug = () => {
    if( state.parentNode === undefined )
      return ''

    return api.index().toString()
  }
}

module.exports = slug
