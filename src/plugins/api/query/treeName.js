'use strict'

const is = require( '@mojule/is' )

const treeName = ({ api, privates }) => {
  privates.registerGet({
    target: api,
    name: 'treeName',
    get: () => 'tree'
  })
}

module.exports = treeName
