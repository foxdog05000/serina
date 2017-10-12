'use strict'

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {

    getListLanguages: function () {
      return $http.get($rootScope.endPoint + '/list-languages')
    },

    openLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/open/' + language.toLowerCase())
    },

    downloadLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/download/' + language.toLowerCase())
    },

    addLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/create/' + language.toLowerCase())
    },

    deleteLanguage: function (language) {
      return $http.get($rootScope.endPoint + '/delete/' + language.toLowerCase())
    },

    addGroup: function (groupName, languages, levels) {
      return $http.post($rootScope.endPoint + '/group/add', { groupName: groupName.toLowerCase(), languages: languages, levels: levels })
    },

    majGroup: function (groupName, languages, levels, originalGroupName) {
      return $http.post($rootScope.endPoint + '/group/upd', { groupName: groupName.toLowerCase(), languages: languages, levels: levels, originalGroupName: originalGroupName })
    },

    deleteGroup: function (groupName, languages, levels) {
      return $http.post($rootScope.endPoint + '/group/del', { groupName: groupName.toLowerCase(), languages: languages, levels: levels })
    },

    addTranslation: function (languages, levels, translation) {
      return $http.post($rootScope.endPoint + '/translation/add', { languages: languages, levels: levels, translation: translation })
    },

    majTranslation: function (languages, levels, translation) {
      return $http.post($rootScope.endPoint + '/translation/upd', { languages: languages, levels: levels, translation: translation })
    },

    deleteTranslation: function (languages, levels, translation) {
      return $http.post($rootScope.endPoint + '/translation/del', { languages: languages, levels: levels, translation: translation })
    }

  }
})
