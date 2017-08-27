'use strict'

angular.module('serinaApp').directive('translation', function ($routeParams, $i18next, DataAccessor, DataManager, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/level/translation.html',
    link: function (scope) {

      scope.$watch('listTranslations', function (newValue, oldValue) {
        if (newValue !== oldValue && oldValue !== undefined) {
          for (var iterator = 0; iterator < oldValue.length; iterator++) {
            if (newValue[iterator] !== undefined) {
              if ((newValue[iterator].key === scope.listTranslations[iterator].key || newValue[iterator].value === scope.listTranslations[iterator].value) && (newValue[iterator].save && oldValue[iterator].save) && (newValue[iterator].modified && oldValue[iterator].modified)) {
                scope.listTranslations[iterator].modified = false
                scope.listTranslations[iterator].modified = 0
                break
              }

              if ((newValue[iterator].key !== oldValue[iterator].key || newValue[iterator].value !== oldValue[iterator].value) && (newValue[iterator].save && oldValue[iterator].save)) {
                if (scope.listTranslations[iterator].nbModified === 0) {
                  scope.listTranslations[iterator].originalKey = oldValue[iterator].key
                }
                scope.listTranslations[iterator].modified = true
                scope.listTranslations[iterator].nbModified++
              }
            }
          }
        }
      }, true)

      scope.addTranslation = function () {
        scope.listTranslations.push({ key: '', value: '', save: false, modified: false })
      }

      scope.sendTranslation = function (ev, translation) {
        ev.stopPropagation()
        if (!translation.save) {
          if (translation.key !== '' && translation.value !== '' && !DataManager.find(scope.listTranslations, translation.key, 'trad')) {
            DataAccessor.addTranslation(scope.currentLanguage, $routeParams.levels, translation).then(function () {
              translation.save = true
              translation.nbModified = 0
              Toast.showCustomToast('check', $i18next.t('commons.toast.addTranslation.success', { translation: translation.key }), 'good')
            }, function (response) {
              Toast.showCustomToast('warning', $i18next.t('commons.toast.addTranslation.fail', { translation: translation.key }), 'fail')
              console.error('Error while adding translation', response)
            })
          } else {
            Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addTranslation.tradExist', { translation: translation.key }), 'medium')
            scope.listTranslations = DataManager.remove(scope.listTranslations, translation)
          }
        } else {
          DataAccessor.majTranslation(scope.currentLanguage, $routeParams.levels, translation).then(function () {
            translation.modified = false
            Toast.showCustomToast('check', $i18next.t('commons.toast.majTranslation.success', { translation: translation.key }), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.majTranslation.fail', { translation: translation.key }), 'fail')
            console.error('Error while update translation', response)
          })
        }
      }

      scope.deleteTranslation = function (ev, translation) {
        ev.stopPropagation()
        if (!translation.save) {
          scope.listTranslations = DataManager.remove(scope.listTranslations, translation)
        } else {
          DataAccessor.deleteTranslation(scope.currentLanguage, $routeParams.levels, translation).then(function () {
            scope.listTranslations = DataManager.remove(scope.listTranslations, translation)
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteTranslation.success', { translation: translation.key }), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteTranslation.fail', { translation: translation.key }), 'fail')
            console.error('Unable to delete translation', response)
          })
        }
      }

    }
  }
})
