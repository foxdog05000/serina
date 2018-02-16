'use strict'

angular.module('serinaApp').controller('PreviewCtrl', function ($rootScope, $i18next, Breadcrumb) {

  $rootScope.breadcrumb = Breadcrumb.init('sideMenu.jsonOfLanguages', '/preview')

  if (!$rootScope.settings.keepLanguagesEdit) {
    $rootScope.secondLanguage = ''
    $rootScope.secondLanguageIsValid = false
  }

})
