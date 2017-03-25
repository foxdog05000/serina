'use strict';

angular.module('serinaApp').factory('Dialog', function ($mdDialog) {
  return {

    showConfirm: function(ev) {
      var confirm = $mdDialog.confirm()
        .title('Êtes-vous sûr ?')
        .ariaLabel('Are you sure ?')
        .targetEvent(ev)
        .ok('Valider')
        .cancel('Annuler');

      return $mdDialog.show(confirm);
    }

  };
});
