'use strict'

const state = ({ core }) => {
  core.createState = value => ({
    parentNode: undefined,
    previousSibling: undefined,
    nextSibling: undefined,
    firstChild: undefined,
    lastChild: undefined,
    value
  })
}

module.exports = state
