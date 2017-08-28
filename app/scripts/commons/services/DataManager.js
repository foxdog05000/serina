'use strict'

angular.module('serinaApp').factory('DataManager', function () {
  return {

    find: function (list, item, type) {
      var itemFind = false
      angular.forEach(list, function (element) {
        switch (type) {
          case 'group':
            if (element === item) {
              itemFind = true
            }
            break;
          case 'trad':
            if (element.key === item && element.save) {
              itemFind = true
            }
          default:
            if (element === item) {
              itemFind = true
            }
        }
      })
      return itemFind
    },

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
