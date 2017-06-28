'use strict'

const accepts = ({ api, privates }) => {
  api.accepts = child => privates.accepts( api.nodeName, child.nodeName )
}

module.exports = accepts
