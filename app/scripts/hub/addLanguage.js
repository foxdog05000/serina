'use strict'

angular.module('serinaApp').directive('addLanguage', function ($i18next, DataAccessor, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/add-language.html',
    link: function (scope) {

      scope.addLanguage = function () {
        var codeLanguageAdd = scope.addLanguage.code.toLowerCase()
        var languageNotExist = true
        angular.forEach(scope.listLanguages, function (language) {
          if (language === codeLanguageAdd) {
            languageNotExist = false
          }
        })

        if (languageNotExist) {
          DataAccessor.addLanguage(codeLanguageAdd).then(function () {
            Toast.showCustomToast('check', $i18next.t('commons.toast.addLanguage.success', { language: codeLanguageAdd }), 'good', 'HubCtrl')
            scope.addLanguage.code = ''
            scope.getLanguages()
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.addLanguage.fail', { language: codeLanguageAdd }), 'fail', 'HubCtrl')
            console.error('Unable to add language "' + codeLanguageAdd.toUpperCase() + '"', response)
          })
        } else {
          Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addLanguage.langExist', { language: codeLanguageAdd }), 'medium', 'HubCtrl')
        }
      }

      scope.addLanguage.code = ''

    }
  }
})
