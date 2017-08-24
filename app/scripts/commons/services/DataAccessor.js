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

    deleteLang: function (lang) {
      return $http.get($rootScope.endPoint + '/delete/' + lang.toLowerCase())
    },

    addGroup: function (lang, levels, groupName) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/add', {groupName: groupName.toLowerCase(), levels: levels})
    },

    majGroup: function (lang, levels, groupName, originalGroupName) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/maj', {groupName: groupName.toLowerCase(), levels: levels, originalGroupName: originalGroupName})
    },

    deleteGroup: function (lang, levels, groupName) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/group/del', {groupName: groupName.toLowerCase(), levels: levels})
    },

    addTranslation: function (lang, levels, translation) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/translation/add', {translation: translation, levels: levels})
    },

    majTranslation: function (lang, levels, translation) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/translation/maj', {translation: translation, levels: levels})
    },

    deleteTranslation: function (lang, levels, translation) {
      return $http.post($rootScope.endPoint + '/' + lang.toLowerCase() + '/translation/del', {translation: translation, levels: levels})
    }

  }
})
