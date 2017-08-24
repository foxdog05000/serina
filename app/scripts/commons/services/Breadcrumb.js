'use strict'

angular.module('serinaApp').factory('Breadcrumb', function () {
  return {

    init: function (label, href) {
      return [{label: label, href: href}]
    },

    build: function (currentBreadcrumb, lang, levels) {
      var breadcrumb = currentBreadcrumb
      var currentLevel = 1

      levels = angular.isUndefined(levels) ? levels : levels.split('/')
      angular.forEach(levels, function (level) {
        var hrefComputed = ''
        for (var iterator = 0; iterator < currentLevel; iterator++) {
          hrefComputed += '/' + levels[iterator]
        }

        breadcrumb.push({
          label: level,
          href: '/lang/' + lang + hrefComputed
        })
        currentLevel++
      })
      return breadcrumb
    }

  }
})
