'use strict'

angular.module('serinaApp').controller('PreviewCtrl', function ($rootScope, $i18next, Breadcrumb) {

  $rootScope.breadcrumb = Breadcrumb.init('sideMenu.jsonOfLanguages', '/preview')

})
