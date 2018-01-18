'use strict'

angular.module('serinaApp').directive('btnDownloadLanguage', function ($rootScope, DataAccessor) {
  return {
    restrict: 'E',
    templateUrl: 'views/commons/btn-download-language.html',
    link: function (scope) {

      scope.downloadLanguage = function (language) {
        DataAccessor.downloadLanguage(language).then(function () {
          var anchor = angular.element('<a/>')
          anchor.attr({
            href: $rootScope.endPoint + '/download/' + language,
            target: '_blank',
            download: 'translation.json'
          })[0].click()
        })
      }

    }
}})
