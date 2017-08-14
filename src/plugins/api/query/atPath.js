'use strict'

const is = require( '@mojule/is' )

const atPath = ({ api }) => {
  api.atPath = ( path, separator = '/' ) => {
    let target = api.rootNode
    const slugs = path.split( separator ).filter( s => s !== '' )

    slugs.forEach( slug => {
      if( is.undefined( target ) )
        return

      target = target.childNodes.find( child => child.slug() === slug )
    })

    return target
  }
}

module.exports = atPath
