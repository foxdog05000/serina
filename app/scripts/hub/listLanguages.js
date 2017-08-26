'use strict'

angular.module('serinaApp').directive('listLanguages', function ($i18next, $location, DataAccessor, Toast, Dialog) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/list-languages.html',
    link: function (scope) {

      scope.getListLanguages = function () {
        DataAccessor.getListLanguages().then(function (response) {
          scope.listLanguages = response.data.listLanguages
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
            scope.getListLanguage()
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
          DataAccessor.deleteLang(language).then(function () {
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteLang.success', { language: language }), 'good', 'HubCtrl')
            scope.getListLang()
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteLang.fail', { language: language }), 'fail', 'HubCtrl')
            console.error('Unable to delete language "' + language + '"', response)
          })
        })
      }

      scope.openLanguage = function (language) {
        $location.path('/language/' + language.toLowerCase())
      }

      scope.downloadLanguage = function (language) {
        DataAccessor.downloadLang(language).then(function (response) {
          var anchor = angular.element('<a/>')
          anchor.attr({
            href: 'data:attachment/json;charset=utf-8,' + encodeURI(JSON.stringify(response.data)),
            target: '_blank',
            download: 'translation.json'
          })[0].click()
        })
      }

      scope.getListLanguage()

    }
  }
})
