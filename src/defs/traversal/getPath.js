'use strict'

module.exports = {
  getPath: ( fn, root, node, separator = '/' ) => {
    if( root === node ) return separator

    const slugs = []

    fn.walkUp( fn, root, node, n => {
      const slug = fn.slug( fn, root, n )

      if( slug.includes( separator ) ){
        const message =
          `Node slugs should not contain the separator string "${ separator }"`

        throw new Error( message )
      }

      slugs.unshift( slug )
    })

    return slugs.join( separator )
  },
  argTypes: [ 'fn', 'rootNode', 'node', 'string' ],
  returnType: 'string',
  requires: [ 'walkUp', 'slug' ],
  categories: [ 'traversal' ]
}
