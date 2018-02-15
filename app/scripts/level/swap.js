'use strict'

angular.module('serinaApp').directive('swap', function ($location, $rootScope, $routeParams, Breadcrumb, DataAccessor) {
  return {
    restrict: 'E',
    templateUrl: 'views/level/swap.html',
    link: function (scope) {

      scope.disabledSwap = $rootScope.secondLanguage === ''
      $rootScope.secondLanguageIsValid = false

      var getListLanguagesForSwap = function () {
        scope.languagesForSwap = []
        DataAccessor.getListLanguages().then(function (response) {
          var listAllLangages = response.data.listLanguages
          angular.forEach(listAllLangages, function (language) {
            if (language.code !== scope.languages[0]) {
              scope.languagesForSwap.push(language)
            }
          })
        }, function (response) {
          console.error('Error on recover list languages for swap', response)
        })
      }

      var appendSecondLanguage = function (content, levels) {
        if (!angular.isUndefined(levels)) {
          levels = levels.replace(/\//g, '.')
          content = eval('content.' + levels)
        }

        angular.forEach(scope.listGroups, function (groupName) {
          if (angular.isUndefined(content[groupName])) {
            DataAccessor.addGroup(groupName, scope.languages, $routeParams.levels).then(function () {
              console.log('Successfully add missing group in second language')
            }, function (response) {
              console.error('Error on add missig group on second language', response)
            })
          }
        })

        angular.forEach(content, function (translation, key) {
          if (!angular.isObject(translation)) {
            angular.forEach(scope.listTranslations, function (translationInList) {
              if (key === translationInList.key) {
                translationInList.value.push(translation)
              }
            })
          }
        })
      }

      scope.selectSecondLanguage = function (secondLanguage) {
        $rootScope.secondLanguage = secondLanguage
        scope.disabledSwap = scope.languages[0] === secondLanguage || secondLanguage.length < 2
      }

      scope.swapLanguages = function () {
        scope.languages = scope.languages.reverse()
        $rootScope.secondLanguage = scope.languages[1]
        $location.path($location.path().replace(scope.languages[1], scope.languages[0]))
      }

      scope.recoverSecondaryLanguage = function () {
        $rootScope.secondLanguageIsValid = false
        DataAccessor.openLanguage($rootScope.secondLanguage).then(function (response) {
          appendSecondLanguage(response.data, $routeParams.levels)
          $rootScope.secondLanguageIsValid = true
          scope.languages.push($rootScope.secondLanguage)
          angular.copy(scope.listTranslations, scope.originalListTranslations)
          $rootScope.breadcrumb[0].label = scope.languages[0].toUpperCase() + ' / ' + scope.languages[1].toUpperCase()
        }, function (response) {
          console.error('Error on open second language ' + $rootScope.secondLanguage, response)
        })
      }

      getListLanguagesForSwap()

    }
  }
})
