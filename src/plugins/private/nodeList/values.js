'use strict'

const values = ({ privates }) => {
  privates.values = function*( generator ){
    for( let item of generator() )
      yield item
  }
}

module.exports = values
