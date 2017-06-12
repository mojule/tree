'use strict'

const getPath = ( api, state ) => {
  api.getPath = ( separator = '/' ) => {
    if( state.parentNode === undefined )
      return separator

    const slugs = []

    api.inclusiveAncestorNodes.forEach( current => {
      const slug = current.slug()

      if( slug.includes( separator ) )
        throw new Error(
          `Node slugs should not contain the separator string "${ separator }"`
        )

      slugs.unshift( slug )
    })

    return slugs.join( separator )
  }
}

module.exports = getPath
