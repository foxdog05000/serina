'use strict'

angular.module('serinaApp').factory('LocalStorage', function () {
  return {

    itemExist: function (itemKey) {
      return localStorage.getItem(itemKey) !== null
    },

    getItem: function (itemKey) {
      return JSON.parse(localStorage.getItem(itemKey))
    },

    setItem: function (itemKey, data) {
      localStorage.setItem(itemKey, JSON.stringify(data))
    }

  }
})
