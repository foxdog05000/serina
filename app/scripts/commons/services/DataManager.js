'use strict'

angular.module('serinaApp').factory('DataManager', function () {
  return {

    find: function (list, item, type) {
      let itemFind = false
      angular.forEach(list, function (element) {
        if (type === 'group') {
          if (element === item) {
            itemFind = true
          }
        }
        if (type === 'trad' && list.length > 1) {
          if (element.key === item) {
            itemFind = true
          }
        }
      })
      return itemFind
    },

    remove: function (list, item) {
      let result = []
      angular.forEach(list, function (element) {
        if (element !== item) {
          result.push(element)
        }
      })
      return result
    }

  }
})
