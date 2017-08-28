'use strict'

angular.module('serinaApp').directive('basicSettings', function ($mdColorPalette) {
  return {
    restrict: 'E',
    templateUrl: 'views/settings/basic-settings.html',
    link: function (scope) {

      scope.switchDiplayFormat = true
      scope.actualDisplayFormat = {
        label: 'md-card',
        icon: 'view_agenda'
      }
      scope.selectedLanguage = 'en'

      scope.displayActualFormatOfLanguages = function (switchDiplayFormat) {
        if (switchDiplayFormat) {
          scope.actualDisplayFormat = {
            label: 'md-card',
            icon: 'view_agenda'
          }
        } else {
          scope.actualDisplayFormat = {
            label: 'md-list',
            icon: 'list'
          }
        }
      }

      scope.languages = [
        { code: 'en'},
        { code: 'fr'}
      ]

      scope.colors = Object.keys($mdColorPalette)

      scope.mdURL = 'https://material.google.com/style/color.html#color-color-palette'

    }
  }
})
