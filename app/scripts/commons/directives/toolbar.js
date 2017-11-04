'use strict'

angular.module('serinaApp').directive('toolbar', function () {
  return {
    restrict: 'E',
    templateUrl: 'views/commons/toolbar.html',
    link: function (scope) {

      scope.search = null

      scope.initiateSearch = function () {
        scope.search = ''
      }

      scope.showPreSearchBar = function () {
        return scope.search === null
      }

      scope.endSearch = function () {
        scope.search = null
      }

      scope.searchKey = function () {
        if (!angular.isUndefined(scope.searchKey)) {
          var inputKeys = document.querySelectorAll('translation md-card .key')
          for (var iterator = 0; iterator < inputKeys.length; iterator++) {
            if (inputKeys[iterator].value.indexOf(scope.search) !== -1) {
              inputKeys[iterator].focus()
            }
          }
          scope.endSearch()
        }
      }

    }
  }
})
