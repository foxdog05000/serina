'use strict'

angular.module('serinaApp').directive('level', function ($routeParams, DataAccessor) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/level.html',
    link: function (scope) {

      var getListGroupsAndTrad = function (langJson) {
        scope.listGroups = []
        scope.listTrad = []
        angular.forEach(langJson, function (trad, key) {
          if (angular.isObject(trad)) {
            scope.listGroups.push(key)
          } else {
            scope.listTrad.push({ key, trad})
          }
        })
      }

      DataAccessor.openLang($routeParams.lang.toLowerCase()).then(function (response) {
        getListGroupsAndTrad(response.data)
      }, function (response) {
        console.error('Error', response);
      })

    }
  }
})
