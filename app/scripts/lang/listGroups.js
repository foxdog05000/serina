'use strict'

angular.module('serinaApp').directive('listGroups', function ($routeParams, DataAccessor) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/list-groups.html',
    link: function (scope) {

      var getListGroups = function (langJson) {
        angular.forEach(data, function (firstLevelTrad) {
          console.log(firstLevelTrad);
        })
      }

      DataAccessor.openLang($routeParams.lang.toLowerCase()).then(function (response) {
        getListGroups(response.data)
      }, function (response) {
        console.error('Error', response);
      })

    }
  }
})
