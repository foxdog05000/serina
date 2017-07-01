'use strict'

angular.module('serinaApp').controller('HubCtrl', function ($rootScope, $i18next) {

  $rootScope.breadcrumb = [{ label: $i18next.t('sideMenu.listOfLanguages'), href: '/hub' }]

})
