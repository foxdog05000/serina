'use strict'

angular.module('serinaApp').component('basicSettings', {
  controller: function ($rootScope, $mdColorPalette, $i18next, LocalStorage) {

    this.displayFormat = [
      { label: 'card', icon: 'view_agenda' },
      { label: 'list', icon: 'list' }
    ]

    this.changeDisplayFormat = function (format) {
      $rootScope.settings.selectedDisplayFormat = format
      LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
    }

    this.languages = [
      { code: 'en' },
      { code: 'es' },
      { code: 'fr' }
    ]

    this.changeLocaleOfApplication = function (language) {
      $rootScope.settings.locale = language
      window.i18next.changeLanguage($rootScope.settings.locale)
      LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
    }

  },
  templateUrl: 'views/settings/basic-settings.html'
})
