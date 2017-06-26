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

    addGroup: function (lang, groupName) {
      return $http.get($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/' + groupName.toLowerCase() + '/add')
    },

    addTrad: function (lang, groups, trad) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/trad/add', {trad: trad, groups: groups})
    },

    deleteLang: function (lang) {
      return $http.get($rootScope.endPoint + '/delete/' + lang.toLowerCase())
    },

    deleteGroup: function (lang, groupName) {
      return $http.get($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/' + groupName.toLowerCase() + '/del')
    },

    deleteTrad: function (lang, trad) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/trad/del', trad)
    }

  }
})
