'use strict'

angular.module('serinaApp').directive('trad', function (DataAccessor, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/trad.html',
    link: function (scope) {

      scope.addTrad = function () {
        scope.listTrad.push({key: '', trad: ''})
      }

      scope.sendNewTrad = function (trad, ev) {
        DataAccessor.addTrad(scope.currentLang, trad).then(function () {
          Toast.showCustomToast('check', 'Nouvelle traduction ajouté avec succés !', 'good')
        }, function (response) {
          Toast.showCustomToast('warning', "Erreur lors de l'ajout de la nouvelle traduction ! ", 'fail')
          console.error("Erreur lors de l'ajout de la nouvelle traduction !")
        })
      }

      scope.deleteTrad = function (trad, ev) {
        DataAccessor.deleteGroup(scope.currentLang, trad).then(function () {
          Toast.showCustomToast('check', 'Traduction supprimé avec succés !', 'good')
        }, function (response) {
          Toast.showCustomToast('warning', 'Impossible de supprimer la traduction ' + trad, 'fail')
          console.error('Impossible de supprimer la traduction', response)
        })
      }

    }
  }
})
