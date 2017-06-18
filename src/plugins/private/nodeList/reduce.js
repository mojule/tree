'use strict'

const reduce = ({ privates }) => {
  privates.reduce = ( generator, reducer, initialValue ) => {
    const iterable = generator()
    let i = 0

    if( initialValue === undefined ) {
      for( let item of iterable ) {
        initialValue = item

        break
      }

      i++
    }

    for( let item of iterable ) {
      initialValue = reducer( initialValue, item, i )

      i++
    }

    return initialValue
  }
}

module.exports = reduce
