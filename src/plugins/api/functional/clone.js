'use strict'

const utils = require( '@mojule/utils' )

const { clone: jsonClone } = utils

/*
  assumes value is JSON serializable - if not you can call with a different
  mapper
*/
const clone = ({ api, Api }) => {
  api.clone = ( mapper = value => jsonClone( value ) ) =>
    api.map( Api, mapper )
}

module.exports = clone
