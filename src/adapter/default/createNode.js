'use strict'

module.exports = {
  createNode: value => ({
    value,
    children: []
  }),
  argTypes: [ 'nodeValue' ],
  returnType: 'node',
  categories: [ 'manipulation', 'adapter' ]
}
