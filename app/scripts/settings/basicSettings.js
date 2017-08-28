'use strict'

angular.module('serinaApp').directive('basicSettings', function ($rootScope, $mdColorPalette) {
  return {
    restrict: 'E',
    templateUrl: 'views/settings/basic-settings.html',
    link: function (scope) {

      scope.switchDiplayFormat = true
      scope.selectedLanguage = $rootScope.locale
      scope.selectedDisplayFormat = 'card'

      scope.displayFormat = [
        { label: 'card', icon: 'view_agenda' },
        { label: 'list', icon: 'list' }
      ]

      scope.languages = [
        { code: 'en'},
        { code: 'fr'}
      ]

      scope.changeLocaleOfApplication = function () {
        $rootScope.locale = scope.selectedLanguage
        window.i18next.changeLanguage($rootScope.locale);
      }

      scope.colors = Object.keys($mdColorPalette)

      scope.mdURL = 'https://material.google.com/style/color.html#color-color-palette'

    }
  }
})
