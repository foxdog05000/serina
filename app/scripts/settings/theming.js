'use strict'

angular.module('serinaApp').directive('theming', function ($rootScope, LocalStorage) {
  return {
    restrict: 'E',
    templateUrl: 'views/settings/theming.html',
    link: function (scope) {

      scope.colors = [
        { label: 'commons.themeColor.indigo', value: 'indigo' },
        { label: 'commons.themeColor.green', value: 'green' },
        { label: 'commons.themeColor.orange', value: 'orange' },
        { label: 'commons.themeColor.purple', value: 'purple' },
        { label: 'commons.themeColor.brown', value: 'brown' },
        { label: 'commons.themeColor.grey', value: 'grey' }
      ]

      scope.changeColor = function (color) {
        $rootScope.settings.theme = color
        LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
      }

    }
  }
})
