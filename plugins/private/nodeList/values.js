'use strict'

const values = api => {
  api.values = function*( generator ){
    for( let item of generator() )
      yield item
  }
}

module.exports = values
