'use strict'

angular.module('serinaApp').directive('listLanguages', function ($rootScope, $location, $i18next, DataAccessor, Toast, Dialog) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/list-languages.html',
    link: function (scope) {

      scope.getListLanguages = function () {
        DataAccessor.getListLanguages().then(function (response) {
          scope.listLanguages = response.data
        }, function (response) {
          console.error('Unable to retrieve languages list', response)
        })
      }

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
