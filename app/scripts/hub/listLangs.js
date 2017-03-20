'use strict';

angular.module('serinaApp').directive('listLangs', function (DataAccessor) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/list-langs.html',
    link: function (scope) {

      DataAccessor.getListLang().then(function (response) {
        scope.listLangs = response.data.listLangs;
      }, function (response) {
        console.error("Impossible de récupérer la liste des langues", response);
      });

    }
  };
});
