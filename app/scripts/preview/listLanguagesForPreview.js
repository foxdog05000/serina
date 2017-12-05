'use strict'

angular.module('serinaApp').directive('listLanguagesForPreview', function (DataAccessor) {
  return {
    restrict: 'E',
    templateUrl: 'views/preview/list-languages-for-preview.html',
    link: function (scope) {

      var recoverListLanguagesForPreview = function () {
        DataAccessor.getListLanguages().then(function (response) {
          scope.listLanguages = response.data.listLanguages
        }, function (response) {
          console.error('Unable to retrieve languages list', response)
        })
      }

      scope.previewLanguage = function (languageCode) {
        scope.selectedLanguage = languageCode
        DataAccessor.openLanguage(languageCode).then(function (response) {
          scope.previewJson = response.data
        }, function (response) {
          // TODO error
        })
      }

      recoverListLanguagesForPreview()

    }
  }
})
