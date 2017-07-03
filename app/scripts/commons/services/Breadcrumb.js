'use strict'

angular.module('serinaApp').factory('Breadcrumb', function () {
  return {

    init: function (label, href) {
      return [{label: label, href: href}]
    },

    build: function (currentBreadcrumb, lang, groups) {
      var breadcrumb = currentBreadcrumb
      var currentLevel = 1

      groups = angular.isUndefined(groups) ? groups : groups.split('/')
      angular.forEach(groups, function (group) {
        var hrefComputed = ''
        for (var iterator = 0; iterator < currentLevel; iterator++) {
          hrefComputed += '/' + groups[iterator]
        }
        
        breadcrumb.push({
          label: group,
          href: '/lang/' + lang + hrefComputed
        })
        currentLevel++
      })
      return breadcrumb
    }

  }
})
