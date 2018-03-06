'use strict'

angular.module('serinaApp').factory('SecondLanguage', function () {
  return {

    definedSecondLanguage: function (secondLanguage) {
      return angular.isDefined(secondLanguage) && typeof secondLanguage === 'string' ? secondLanguage : ''
    }

  }
})
