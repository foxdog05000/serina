'use strict'

angular.module('serinaApp').directive('trad', function ($routeParams, DataAccessor, DataManager, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/trad.html',
    link: function (scope) {

      scope.addTrad = function () {
        scope.listTrad.push({key: '', trad: ''})
      }

      scope.sendTrad = function (trad, ev) {
        ev.stopPropagation()
        if (trad.key !== '' && trad.trad !== '') {
          DataAccessor.addTrad(scope.currentLang, $routeParams.group, trad).then(function () {
            Toast.showCustomToast('check', 'Nouvelle traduction ajouté avec succés !', 'good')
          }, function (response) {
            Toast.showCustomToast('warning', "Erreur lors de l'ajout de la nouvelle traduction ! ", 'fail')
            console.error("Erreur lors de l'ajout de la nouvelle traduction !", response)
          })
        }
      }

      scope.deleteTrad = function (trad, ev) {
        ev.stopPropagation()
        if (trad.key === '' && trad.trad === '') {
          scope.listTrad = DataManager.remove(scope.listTrad, trad)
        } else {
          DataAccessor.deleteTrad(scope.currentLang, trad).then(function () {
            Toast.showCustomToast('check', 'Traduction supprimé avec succés !', 'good')
          }, function (response) {
            Toast.showCustomToast('warning', 'Impossible de supprimer la traduction ' + trad, 'fail')
            console.error('Impossible de supprimer la traduction', response)
          })
        }
      }

    }
  }
})
