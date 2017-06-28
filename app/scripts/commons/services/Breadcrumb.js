'use strict'

angular.module('serinaApp').factory('Breadcrumb', function () {
  return {

    buildBreadcrumb: function (currentBreadcrumb, groups) {
      var breadcrumb = currentBreadcrumb
      groups = angular.isUndefined(groups) ? groups : groups.split('/')
      angular.forEach(groups, function (group) {
        breadcrumb += ' > ' + group
      })
      return breadcrumb
    }

  }
})
