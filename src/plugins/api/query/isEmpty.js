'use strict'

const isEmpty = ({ api, privates }) => {
  api.isEmpty = () => privates.isEmpty( api.nodeName )
}

module.exports = isEmpty
