'use strict'

angular.module('serinaApp').controller('LevelCtrl', function ($rootScope, $scope, $routeParams, $location, DataAccessor, Breadcrumb, SecondLanguage) {
  $rootScope.breadcrumb = Breadcrumb.init($routeParams.language.toUpperCase(), '/language/' + $routeParams.language.toLowerCase())
  var originatorEv

  var getListGroupsAndTranslations = function (content, levels) {
    $scope.listGroups = []
    $scope.listTranslations = []

    if (!angular.isUndefined(levels)) {
      levels = levels.replace(/\//g, '.')
      content = eval('content.' + levels)
    }

    angular.forEach(content, function (translation, key) {
      if (angular.isObject(translation)) {
        $scope.listGroups.push(key)
      } else {
        $scope.listTranslations.push({ key: key, value: translation, save: true, modified: false, nbModified: 0 })
      }
    })
  }

  $scope.btnBack = function () {
    var currentUrl = $location.$$url
    if (currentUrl === '/language/' + $scope.currentLanguage) {
      $location.path('/hub')
    } else {
      var currentUrlSplit = currentUrl.split('/')
      currentUrlSplit.pop()
      var newUrl = ''
      var iterator = 0
      angular.forEach(currentUrlSplit, function (level) {
        if (level === '') {
          newUrl += '/'
          iterator++
        } else {
          newUrl += level
          newUrl += iterator < currentUrlSplit.length - 1 ? '/' : ''
          iterator++
        }
      })
      $location.path(newUrl)
    }
  }

  $scope.openMenu = function ($mdMenu, ev) {
    originatorEv = ev
    $mdMenu.open(ev)
  }

  $scope.currentLanguage = $routeParams.language.toLowerCase()
  $rootScope.secondLanguage = SecondLanguage.definedSecondLanguage($rootScope.secondLanguage);
  DataAccessor.openLanguage($scope.currentLanguage).then(function (response) {
    getListGroupsAndTranslations(response.data, $routeParams.levels)

    if ($rootScope.secondLanguageIsValid) {
      $rootScope.secondLanguageIsValid = true;
      $scope.recoverSecondaryLanguage($rootScope.secondLanguage)
    }
    $rootScope.breadcrumb = Breadcrumb.build($rootScope.breadcrumb, $scope.currentLanguage, $routeParams.levels)
  }, function (response) {
    console.error('Error on open language ' + $scope.currentLanguage, response)
  })

})
