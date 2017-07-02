'use strict'

angular.module('serinaApp').directive('trad', function ($routeParams, $i18next, DataAccessor, DataManager, Toast) {
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
            Toast.showCustomToast('check', $i18next.t('commons.toast.addTrad.success'), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.addTrad.fail'), 'fail')
            console.error('Error while adding new translation', response)
          })
        }
      }

      scope.deleteTrad = function (trad, ev) {
        ev.stopPropagation()
        if (trad.key === '' && trad.trad === '') {
          scope.listTrad = DataManager.remove(scope.listTrad, trad)
        } else {
          DataAccessor.deleteTrad(scope.currentLang, trad).then(function () {
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteTrad.success'), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteTrad.fail', {'trad': trad}), 'fail')
            console.error('Unable to delete translation', response)
          })
        }
      }

    }
  }
})
