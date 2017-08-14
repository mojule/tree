'use strict'

const List = require( '@mojule/list' )
const is = require( '@mojule/is' )

const nodeList = ({ core }) => {
  core.nodeList = List
}

module.exports = nodeList
