'use strict'

angular.module('serinaApp').directive('trad', function ($routeParams, $i18next, DataAccessor, DataManager, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/trad.html',
    link: function (scope) {

      scope.$watch('listTrad', function (newValue, oldValue) {
        if (newValue !== oldValue && oldValue !== undefined) {
          for (var iterator = 0; iterator < oldValue.length; iterator++) {
            if ((newValue[iterator].key === scope.listTrad[iterator].key || newValue[iterator].trad === scope.listTrad[iterator].trad) && (newValue[iterator].save && oldValue[iterator].save) && (newValue[iterator].modified && oldValue[iterator].modified)) {
              scope.listTrad[iterator].modified = false
              scope.listTrad[iterator].modified = 0
              break
            }

            if ((newValue[iterator].key !== oldValue[iterator].key || newValue[iterator].trad !== oldValue[iterator].trad) && (newValue[iterator].save && oldValue[iterator].save)) {
              if (scope.listTrad[iterator].nbModified === 0) {
                scope.listTrad[iterator].originalKey = oldValue[iterator].key
              }
              scope.listTrad[iterator].modified = true
              scope.listTrad[iterator].nbModified++
            }
          }
        }
      }, true)

      scope.addTrad = function () {
        scope.listTrad.push({key: '', trad: '', save: false, modified: false})
      }

      scope.sendTrad = function (trad, ev) {
        ev.stopPropagation()
        if (!trad.save) {
          if (trad.key !== '' && trad.trad !== '' && !DataManager.find(scope.listTrad, trad.key, 'trad')) {
            DataAccessor.addTrad(scope.currentLang, $routeParams.group, trad).then(function () {
              trad.save = true
              trad.nbModified = 0
              Toast.showCustomToast('check', $i18next.t('commons.toast.addTrad.success', {trad: trad.key}), 'good')
            }, function (response) {
              Toast.showCustomToast('warning', $i18next.t('commons.toast.addTrad.fail', {trad: trad.key}), 'fail')
              console.error('Error while adding new translation', response)
            })
          } else {
            Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addTrad.tradExist', {trad: trad.key}), 'medium')
            scope.listTrad = DataManager.remove(scope.listTrad, trad)
          }
        } else {
          console.log('Maj trad', trad)
          DataAccessor.majTrad(scope.currentLang, $routeParams.group, trad).then(function () {
            trad.modified = false
            Toast.showCustomToast('check', $i18next.t('commons.toast.majTrad.success', {trad: trad.key}), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.majTrad.fail', {trad: trad.key}), 'fail')
            console.error('Error while update translation', response)
          })
        }
      }

      scope.deleteTrad = function (trad, ev) {
        ev.stopPropagation()
        if (!trad.save) {
          scope.listTrad = DataManager.remove(scope.listTrad, trad)
        } else {
          DataAccessor.deleteTrad(scope.currentLang, $routeParams.group, trad).then(function () {
            scope.listTrad = DataManager.remove(scope.listTrad, trad)
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteTrad.success', {trad: trad.key}), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteTrad.fail', {trad: trad.key}), 'fail')
            console.error('Unable to delete translation', response)
          })
        }
      }

    }
  }
})
