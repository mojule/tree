'use strict'

module.exports = {
  atPath: ( fn, root, path, separator = '/' ) => {
    let node = root

    const slugs = path.split( separator ).filter( s => s !== '' )

    slugs.forEach( slug => {
      if( node ){
        const children = fn.getChildren( node )

        node = children.find( childNode =>
          fn.slug( fn, root, childNode ) === slug
        )
      }
    })

    return node
  },
  argTypes: [ 'fn', 'rootNode', 'string', 'string' ],
  returnType: 'node',
  requires: [ 'walkUp', 'slug' ],
  categories: [ 'traversal' ]
}
