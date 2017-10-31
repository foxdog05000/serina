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

    }
  }
})
