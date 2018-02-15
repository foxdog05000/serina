'use strict'

angular.module('serinaApp').component('btnDownloadLanguage', {
  bindings: {
    locale: '<'
  },
  controller: function BtnDownloadLanguageCtrl ($rootScope, DataAccessor) {

    this.downloadLanguage = function (language) {
      DataAccessor.downloadLanguage(language).then(function () {
        var anchor = angular.element('<a/>')
        anchor.attr({
          href: $rootScope.endPoint + '/download/' + language,
          target: '_blank',
          rel: 'noopener',
          download: 'translation.json'
        })[0].click()
      })
    }

  },
  templateUrl: 'views/commons/directives/btn-download-language.html'
})
