'use strict';

angular.module('serinaApp').factory('Toast', function ($rootScope, $mdToast) {
  return {
    showCustomToast: function (icon, text, consequence, ctrl) {
      $mdToast.show({
        hideDelay: 3000,
        position: 'top right',
        toastClass: consequence,
        controller: ctrl,
        template: '<md-toast><md-icon class="material-icons">' + icon + '</md-icon><span class="md-toast-text" flex>' + text + '</span></md-toast>'
      });
    }
  };
});
