'use strict'

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {

    getListLang: function () {
      return $http.get($rootScope.endPoint + '/list-lang')
    },

    openLang: function (lang) {
      return $http.get($rootScope.endPoint + '/open/' + lang.toLowerCase())
    },

    addLang: function (lang) {
      return $http.get($rootScope.endPoint + '/create/' + lang.toLowerCase())
    },

    addGroup: function (groupName) {
      return $http.get($rootScope.endPoint + '/group/' + groupName.toLowerCase() + '/add')
    },

    addTrad: function (trad) {
      return $http.post($rootScope.endPoint + '/trad/add', trad)
    },

    deleteLang: function (lang) {
      return $http.get($rootScope.endPoint + '/delete/' + lang.toLowerCase())
    }

  }
})
