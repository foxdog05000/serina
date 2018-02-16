'use strict'

angular.module('serinaApp').controller('SettingsCtrl', ['$rootScope', '$i18next', 'Breadcrumb', 'LocalStorage', function ($rootScope, $i18next, Breadcrumb, LocalStorage) {

  $rootScope.breadcrumb = Breadcrumb.init('sideMenu.settings', '/settings')
  if (!$rootScope.settings.keepLanguagesEdit) {
    $rootScope.secondLanguage = ''
    $rootScope.secondLanguageIsValid = false
  }

  $rootScope.saveSettings = function () {
    LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
  }

}])
