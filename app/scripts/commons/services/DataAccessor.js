'use strict';

angular.module('serinaApp').factory('DataAccessor', function () {
  return {
    getListLangTranslate: function () {
      return $http.get($rootScope.endPoint + '/api/list-lang-translate');
    }
  }
});
