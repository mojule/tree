'use strict'

const accepts = api => {
  api.accepts = child => !api.isEmpty()
}

module.exports = accepts
