'use strict'

angular.module('serinaApp').factory('Breadcrumb', function () {
  return {

    init: function (label, href) {
      return [{label: label, href: href}]
    },

    build: function (currentBreadcrumb, groups) {
      var breadcrumb = currentBreadcrumb
      groups = angular.isUndefined(groups) ? groups : groups.split('/')
      angular.forEach(groups, function (group) {
        breadcrumb.push({
          label: group,
          href: '/' + group
        })
      })
      return breadcrumb
    }

  }
})
