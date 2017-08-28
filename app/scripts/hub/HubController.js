'use strict'

angular.module('serinaApp').controller('HubCtrl', function ($rootScope, $i18next, Breadcrumb) {

  $rootScope.breadcrumb = Breadcrumb.init('sideMenu.listOfLanguages', '/hub')

})
