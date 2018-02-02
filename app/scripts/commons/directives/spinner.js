'use strict'

angular.module('serinaApp').component('spinner', {
  bindings: {
    loading: '<'
  },
  templateUrl: 'views/commons/directives/spinner.html'
})
