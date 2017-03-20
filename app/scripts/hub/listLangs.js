'use strict';

angular.module('serinaApp').directive('listLangs', function (DataAccessor, $mdToast) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/list-langs.html',
    link: function (scope) {

      scope.getListLang = function () {
        DataAccessor.getListLang().then(function (response) {
          scope.listLangs = response.data.listLangs;
        }, function (response) {
          console.error("Impossible de récupérer la liste des langues", response);
        });
      };

      scope.addLang = function () {
        DataAccessor.addLang(scope.addLang.code).then(function (response) {
          $mdToast.show(
            $mdToast.simple()
              .textContent('Langue ajouter avec succés !')
              .position('top right')
              .hideDelay(3000)
          );
          scope.getListLang();
        }, function (response) {
          $mdToast.show(
            $mdToast.simple()
              .textContent("Impossible d'ajouter la langue" + scope.addLang.code)
              .position('top right')
              .hideDelay(3000)
          );
          console.error("Impossible d'ajouter la langue" + scope.addLang.code, response);
        });
      };

      scope.getListLang();

    }
  };
});
