'use strict'

angular.module('serinaApp').factory('SecondLanguage', function () {
  return {

    definedSecondLanguage: function (secondLanguage) {
      return angular.isDefined(secondLanguage) ? secondLanguage : ''
    },

    secondLanguageIsValid: function (secondLanguage) {
      return angular.isDefined(secondLanguage) && secondLanguage.length === 2
    }

  }
})
