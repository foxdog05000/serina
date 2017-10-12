'use strict'

angular.module('serinaApp').directive('translation', function ($rootScope, $routeParams, $i18next, DataAccessor, DataManager, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/level/translation.html',
    link: function (scope) {

      scope.$watch('listTranslations', function (newValue, oldValue) {
        if (newValue !== oldValue && !angular.isUndefined(oldValue)) {
          for (var iterator = 0; iterator < oldValue.length; iterator++) {
            if (!angular.isUndefined(newValue[iterator]) && (newValue[iterator].save && oldValue[iterator].save)) {
              if (!$rootScope.secondLanguageIsValid) {
                if (angular.equals(newValue[iterator].key, scope.originalListTranslations[iterator].key) && angular.equals(newValue[iterator].value[0], scope.originalListTranslations[iterator].value[0])) {
                  console.log('item not modified')
                  scope.listTranslations[iterator].modified = false
                } else {
                  console.log('item modified')
                  scope.listTranslations[iterator].modified = true
                  scope.listTranslations[iterator].originalKey = scope.originalListTranslations[iterator].key
                }
              } else {
                console.log('secondLanguageIsValid', $rootScope.secondLanguage)
                if (angular.equals(newValue[iterator].key, scope.originalListTranslations[iterator].key) && angular.equals(newValue[iterator].value[0], scope.originalListTranslations[iterator].value[0])  && angular.equals(newValue[iterator].value[1], scope.originalListTranslations[iterator].value[1])) {
                  console.log('item not modified')
                  scope.listTranslations[iterator].modified = false
                } else {
                  console.log('item modified')
                  scope.listTranslations[iterator].modified = true
                  scope.listTranslations[iterator].originalKey = scope.originalListTranslations[iterator].key
                }
              }
            }
          }
        }
      }, true)

      scope.addTranslation = function () {
        var patternTranslation = { key: '', value: '', save: false, modified: false }
        if ($rootScope.secondLanguageIsValid) {
          patternTranslation.secondValue = ''
        }
        scope.listTranslations.push(patternTranslation)
      }

      scope.sendTranslation = function (ev, translation) {
        ev.stopPropagation()
        if (!translation.save) {
          if (translation.key !== '' && translation.value[0] !== '' && !DataManager.find(scope.listTranslations, translation.key, 'trad')) {
            DataAccessor.addTranslation(scope.languages, $routeParams.levels, translation).then(function () {
              translation.save = true
              Toast.showCustomToast('check', $i18next.t('commons.toast.addTranslation.success', { translation: translation.key }), 'good')
            }, function (response) {
              Toast.showCustomToast('warning', $i18next.t('commons.toast.addTranslation.fail', { translation: translation.key }), 'fail')
              console.error('Error while adding translation', response)
            })
          } else {
            Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addTranslation.translationExist', { translation: translation.key }), 'medium')
            scope.listTranslations = DataManager.remove(scope.listTranslations, translation)
          }
        } else {
          DataAccessor.majTranslation(scope.languages, $routeParams.levels, translation).then(function () {
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
          DataAccessor.deleteTranslation(scope.languages, $routeParams.levels, translation).then(function () {
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
