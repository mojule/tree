'use strict'

const List = require( '@mojule/list' )
const is = require( '@mojule/is' )

const nodeList = ({ privates, state, core }) => {
  privates.nodeList = generator => List( generator )
}

module.exports = nodeList
