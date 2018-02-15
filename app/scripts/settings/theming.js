'use strict'

angular.module('serinaApp').component('theming', {
  controller: function ThemingCtrl ($rootScope, LocalStorage) {

    this.colors = [
      { label: 'commons.themeColor.indigo', value: 'indigo' },
      { label: 'commons.themeColor.green', value: 'green' },
      { label: 'commons.themeColor.orange', value: 'orange' },
      { label: 'commons.themeColor.purple', value: 'purple' },
      { label: 'commons.themeColor.brown', value: 'brown' },
      { label: 'commons.themeColor.grey', value: 'grey' }
    ]

    this.changeColor = function (color) {
      $rootScope.settings.theme = color
      LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
    }

  },
  templateUrl: 'views/settings/theming.html'
})
