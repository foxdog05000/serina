'use strict';

angular.module('serinaApp').directive('listLangs', function (DataAccessor, Toast) {
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
        DataAccessor.addLang(scope.addLang.code).then(function () {
          Toast.showCustomToast('check', 'Langue "' + scope.addLang.code.toUpperCase() + '" ajouter avec succés !' , 'good', 'HubCtrl');
          scope.getListLang();
        }, function (response) {
          Toast.showCustomToast('warning', "Impossible d'ajouter la langue '" + scope.addLang.code.toUpperCase() + "'" , 'fail', 'HubCtrl');
          console.error("Impossible d'ajouter la langue '" + scope.addLang.code + "'", response);
        });
      };

      scope.getListLang();

    }
  };
});
