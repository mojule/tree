'use strict'

const accepts = ({ api, privates }) => {
  api.accepts = child => privates.accepts( api.nodeType, child.nodeType )
}

module.exports = accepts
