'use strict'

angular.module('serinaApp').controller('SettingsCtrl', function ($rootScope, $i18next, Breadcrumb) {

  $rootScope.breadcrumb = Breadcrumb.init($i18next.t('sideMenu.settings'), '/settings')

})
