'use strict'

angular.module('serinaApp').component('advancedSettings', {
  controller: function AdvancedSettings ($rootScope) {

    this.toggleCustomTranslationsPath = function (customTranslationsPath) {
      $rootScope.settings.customTranslationsPath = customTranslationsPath;
      $rootScope.saveSettings();
    }

  },
  templateUrl: 'views/settings/advanced-settings.html'
})
