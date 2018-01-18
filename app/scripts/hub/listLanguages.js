'use strict'

angular.module('serinaApp').directive('listLanguages', function ($rootScope, $location, $i18next, DataAccessor, Toast, Dialog) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/list-languages.html',
    link: function (scope) {

      scope.getListLanguages = function () {
        DataAccessor.getListLanguages().then(function (response) {
          scope.listLanguages = response.data.listLanguages

          DataAccessor.countEntitiesListLanguages().then(function (response) {
            var countEntitiesListLanguages = response.data.listLanguages
            angular.forEach(scope.listLanguages, function (language, index) {
              if (language.code === countEntitiesListLanguages[index].code) {
                language.nbTranslations = countEntitiesListLanguages[index].nbTranslations
              }
            })
          }, function (response) {
            console.error('Unable to retrieve the number of translations per language', response)
          })
        }, function (response) {
          console.error('Unable to retrieve languages list', response)
        })
      }

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
            scope.getListLanguages()
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.addLanguage.fail', { language: codeLanguageAdd }), 'fail', 'HubCtrl')
            console.error('Unable to add language "' + codeLanguageAdd.toUpperCase() + '"', response)
          })
        } else {
          Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addLanguage.langExist', { language: codeLanguageAdd }), 'medium', 'HubCtrl')
        }
      }

      scope.addLanguage.code = ''

      scope.deleteLanguage = function (ev, language) {
        Dialog.showConfirm(ev).then(function () {
          DataAccessor.deleteLanguage(language).then(function () {
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteLanguage.success', { language: language }), 'good', 'HubCtrl')
            scope.getListLanguages()
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteLanguage.fail', { language: language }), 'fail', 'HubCtrl')
            console.error('Unable to delete language "' + language + '"', response)
          })
        })
      }

      scope.openLanguage = function (language) {
        $location.path('/language/' + language.toLowerCase())
      }

      scope.getListLanguages()

    }
  }
})
