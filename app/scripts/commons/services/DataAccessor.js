'use strict';

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {

    getListLang: function () {
      return $http.get($rootScope.endPoint + '/list-lang');
    },

    addLang: function (lang) {
      return $http.get($rootScope.endPoint + '/create/' + lang.toLowerCase());
    },

    deleteLang: function (lang) {
      return $http.get($rootScope.endPoint + '/delete/' + lang.toLowerCase());
    },

    openLang: function (lang) {
      return $http.get($rootScope.endPoint + '/open/' + lang.toLowerCase());
    }
  }
});
