'use strict'

const core = api => {
  api.createState = value => ({
    parentNode: undefined,
    previousSibling: undefined,
    nextSibling: undefined,
    firstChild: undefined,
    lastChild: undefined,
    value
  })
}

module.exports = [ core ]
