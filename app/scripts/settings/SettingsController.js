'use strict'

angular.module('serinaApp').controller('SettingsCtrl', function ($rootScope, $i18next, Breadcrumb) {

  $rootScope.breadcrumb = Breadcrumb.init('sideMenu.settings', '/settings')
  $rootScope.secondLanguage = ''

  $rootScope.secondLanguageIsValid = false

})
