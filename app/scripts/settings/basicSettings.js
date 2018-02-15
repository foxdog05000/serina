'use strict'

angular.module('serinaApp').component('basicSettings', {
  controller: function BasicSettingsCtrl ($rootScope) {

    this.displayFormat = [
      { label: 'card', icon: 'view_agenda' },
      { label: 'list', icon: 'list' }
    ]

    this.changeDisplayFormat = function (format) {
      $rootScope.settings.selectedDisplayFormat = format
      $rootScope.saveSettings()
    }

    this.languages = [
      { code: 'en' },
      { code: 'es' },
      { code: 'fr' }
    ]

    this.changeLocaleOfApplication = function (language) {
      $rootScope.settings.locale = language
      window.i18next.changeLanguage($rootScope.settings.locale)
      $rootScope.saveSettings()
    }

    this.changeKeepLanguagesEdit = function (keepLanguagesEdit) {
      $rootScope.settings.keepLanguagesEdit = keepLanguagesEdit
      $rootScope.saveSettings()
    }

  },
  templateUrl: 'views/settings/basic-settings.html'
})
