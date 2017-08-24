'use strict'

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {

    getListLang: function () {
      return $http.get($rootScope.endPoint + '/list-lang')
    },

    openLang: function (lang) {
      return $http.get($rootScope.endPoint + '/open/' + lang.toLowerCase())
    },

    downloadLang: function (lang) {
      return $http.get($rootScope.endPoint + '/download/' + lang.toLowerCase())
    },

    addLang: function (lang) {
      return $http.get($rootScope.endPoint + '/create/' + lang.toLowerCase())
    },

    addGroup: function (lang, groups, groupName) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/add', {groupName: groupName.toLowerCase(), groups: groups})
    },

    addTrad: function (lang, groups, trad) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/trad/add', {trad: trad, groups: groups})
    },

    majTrad: function (lang, groups, trad) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/trad/maj', {trad: trad, groups: groups})
    },

    deleteLang: function (lang) {
      return $http.get($rootScope.endPoint + '/delete/' + lang.toLowerCase())
    },

    deleteGroup: function (lang, groups, groupName) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/del', {groupName: groupName.toLowerCase(), groups: groups})
    },

    deleteTrad: function (lang, groups, trad) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/trad/del', {trad: trad, groups: groups})
    }

  }
})
