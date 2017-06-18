'use strict'

const isEmpty = ({ api }) => {
  api.isEmpty = () => false
}

module.exports = isEmpty
