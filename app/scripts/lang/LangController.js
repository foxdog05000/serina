'use strict'

angular.module('serinaApp').controller('LangCtrl', function ($rootScope, $scope, $routeParams, DataAccessor) {

  $rootScope.pageTitle = 'Langue : ' + $routeParams.lang.toUpperCase()

  DataAccessor.openLang($routeParams.lang).then(function (response) {
    $scope.lang = response.data
  }, function (response) {
    console.error('Error')
  })

})
