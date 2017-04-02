'use strict'

angular.module('serinaApp').controller('LangCtrl', function ($rootScope, $scope, $routeParams, DataAccessor) {
  $rootScope.pageTitle = 'Langue : ' + $routeParams.lang.toUpperCase()
  var originatorEv

  var getListGroupsAndTrad = function (langJson) {
    $scope.listGroups = []
    $scope.listTrad = []
    angular.forEach(langJson, function (trad, key) {
      if (angular.isObject(trad)) {
        $scope.listGroups.push(key)
      } else {
        $scope.listTrad.push({key, trad})
      }
    })
  }

  $scope.openMenu = function ($mdMenu, ev) {
    originatorEv = ev
    $mdMenu.open(ev)
  }

  $scope.currentLang = $routeParams.lang.toLowerCase()
  DataAccessor.openLang($scope.currentLang).then(function (response) {
    getListGroupsAndTrad(response.data)
  }, function (response) {
    console.error('Error', response)
  })
})
