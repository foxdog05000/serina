'use strict'

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {

    getListLang: function () {
      return $http.get($rootScope.endPoint + '/list-languageuages')
    },

    openLang: function (language) {
      return $http.get($rootScope.endPoint + '/open/' + language.toLowerCase())
    },

    downloadLang: function (language) {
      return $http.get($rootScope.endPoint + '/download/' + language.toLowerCase())
    },

    addLang: function (language) {
      return $http.get($rootScope.endPoint + '/create/' + language.toLowerCase())
    },

    deleteLang: function (language) {
      return $http.get($rootScope.endPoint + '/delete/' + language.toLowerCase())
    },

    addGroup: function (language, levels, groupName) {
      return $http.post($rootScope.endPoint + '/' + language.toLowerCase() + '/group/add', { groupName: groupName.toLowerCase(), levels: levels })
    },

    majGroup: function (language, levels, groupName, originalGroupName) {
      return $http.post($rootScope.endPoint + '/' + language.toLowerCase() + '/group/maj', { groupName: groupName.toLowerCase(), levels: levels, originalGroupName: originalGroupName })
    },

    deleteGroup: function (language, levels, groupName) {
      return $http.post($rootScope.endPoint + '/' + language.toLowerCase() + '/group/del', { groupName: groupName.toLowerCase(), levels: levels })
    },

    addTranslation: function (language, levels, translation) {
      return $http.post($rootScope.endPoint + '/' + language.toLowerCase() + '/translation/add', { translation: translation, levels: levels })
    },

    majTranslation: function (language, levels, translation) {
      return $http.post($rootScope.endPoint + '/' + language.toLowerCase() + '/translation/maj', { translation: translation, levels: levels })
    },

    deleteTranslation: function (language, levels, translation) {
      return $http.post($rootScope.endPoint + '/' + language.toLowerCase() + '/translation/del', { translation: translation, levels: levels })
    }

  }
 })
