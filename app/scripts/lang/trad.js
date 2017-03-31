'use strict'

angular.module('serinaApp').directive('trad', function (DataAccessor, Toast) {
  return {
    restrict: 'E',
    templateURl: 'views/lang/trad.html',
    link: function (scope) {

      scope.addTrad = function () {
        scope.listTrad.push({key: '', trad: ''})
      }

      scope.sendNewTrad = function () {
        DataAccessor.addTrad(scope.trad).then(function () {
          Toast.showCustomToast('check', 'Nouvelle traduction ajouté avec succés !', 'good')
        }, function (response) {
          Toast.showCustomToast('warning', "Erreur lors de l'ajout de la nouvelle traduction ! ", 'fail')
          console.error("Erreur lors de l'ajout de la nouvelle traduction !")
        })
      }

    }
  }
})
