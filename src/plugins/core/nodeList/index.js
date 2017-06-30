'use strict'

const List = require( '@mojule/list' )
const is = require( '@mojule/is' )

const nodeList = ({ core }) => {
  core.nodeList = generator => List( generator )
}

module.exports = nodeList
