'use strict'

const is = require( '@mojule/is' )

const treeName = ({ api, core }) => {
  core.registerProperty({
    target: api,
    name: 'treeName',
    get: () => 'tree'
  })
}

module.exports = treeName
