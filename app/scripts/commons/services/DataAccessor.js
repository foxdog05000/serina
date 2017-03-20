'use strict';

angular.module('serinaApp').factory('DataAccessor', function ($rootScope, $http) {
  return {
    getListLang: function () {
      return $http.get($rootScope.endPoint + '/list-lang');
    }
  }
});
