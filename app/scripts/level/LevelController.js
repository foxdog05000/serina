'use strict'

angular.module('serinaApp').controller('LevelCtrl', function ($rootScope, $scope, $routeParams, $location, DataAccessor, Breadcrumb, SecondLanguage) {
  var originatorEv

  if ($rootScope.secondLanguageIsValid) {
    $rootScope.breadcrumb = Breadcrumb.init($routeParams.language.toUpperCase() + ' / ' + $rootScope.secondLanguage.toUpperCase(), '/language/' + $routeParams.language.toLowerCase())
  } else {
    $rootScope.breadcrumb = Breadcrumb.init($routeParams.language.toUpperCase(), '/language/' + $routeParams.language.toLowerCase())
  }

  var getListGroupsAndTranslations = function (content, levels) {
    $scope.listGroups = []
    $scope.listTranslations = []
    $scope.originalListTranslations = []

    if (!angular.isUndefined(levels)) {
      levels = levels.replace(/\//g, '.')
      content = eval('content.' + levels)
    }

    angular.forEach(content, function (translation, key) {
      if (angular.isObject(translation)) {
        $scope.listGroups.push(key)
      } else {
        $scope.listTranslations.push({ key: key, value: [translation], save: true, modified: false })
      }
    })

    angular.copy($scope.listTranslations, $scope.originalListTranslations)
  }

  $scope.btnBack = function () {
    var currentUrl = $location.$$url
    if (currentUrl === '/language/' + $scope.languages[0]) {
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

  $scope.languages = []
  $scope.languages.push($routeParams.language.toLowerCase())
  $rootScope.secondLanguage = SecondLanguage.definedSecondLanguage($rootScope.secondLanguage)
  DataAccessor.openLanguage($scope.languages[0]).then(function (response) {
    getListGroupsAndTranslations(response.data, $routeParams.levels)

    if (angular.isDefined($rootScope.secondLanguage) && $rootScope.secondLanguage.length === 2) {
      $rootScope.secondLanguageIsValid = true
      $scope.recoverSecondaryLanguage($rootScope.secondLanguage)
    }
    $rootScope.breadcrumb = Breadcrumb.build($rootScope.breadcrumb, $scope.languages[0], $routeParams.levels)
  }, function (response) {
    console.error('Error on open language ' + $scope.languages[0], response)
  })

})
