'use strict'

angular.module('serinaApp').factory('DataManager', function () {
  return {

    remove: function (list, item) {
      var result = []
      angular.forEach(list, function (element) {
        if (element !== item) {
          result.push(element)
        }
      })
      return result
    }

  }
})
