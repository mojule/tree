'use strict'

const isEmpty = ({ api, privates }) => {
  api.isEmpty = () => privates.isEmpty( api.nodeType )
}

module.exports = isEmpty
