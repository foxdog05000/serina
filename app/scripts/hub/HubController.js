'use strict'

angular.module('serinaApp').controller('HubCtrl', function ($rootScope, $i18next, Breadcrumb) {

  $rootScope.breadcrumb = Breadcrumb.init($i18next.t('sideMenu.listOfLanguages'), '/hub')

  setTimeout(function () {
    $rootScope.breadcrumb = Breadcrumb.init($i18next.t('sideMenu.listOfLanguages'), '/hub')
  }, 750)

})
