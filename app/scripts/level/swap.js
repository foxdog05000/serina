'use strict'

angular.module('serinaApp').directive('swap', function ($rootScope, $routeParams, Breadcrumb, DataAccessor) {
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
            if (language !== scope.languages[0]) {
              scope.languagesForSwap.push(language)
            }
          })
        }, function (response) {
          console.error('Error on recover list languages for swap', response)
        })
      }

      scope.selectSecondLanguage = function (secondLanguage) {
        $rootScope.secondLanguage = secondLanguage
        scope.disabledSwap = scope.languages[0] === secondLanguage || secondLanguage.length < 2
      }

      var appendTranslationOfSecondLanguage = function (content, levels) {
        if (!angular.isUndefined(levels)) {
          levels = levels.replace(/\//g, '.')
          content = eval('content.' + levels)
        }

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

      scope.recoverSecondaryLanguage = function () {
        $rootScope.secondLanguageIsValid = false
        DataAccessor.openLanguage($rootScope.secondLanguage).then(function (response) {
          appendTranslationOfSecondLanguage(response.data, $routeParams.levels)
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
