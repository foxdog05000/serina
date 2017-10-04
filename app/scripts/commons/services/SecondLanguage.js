'use strict'

angular.module('serinaApp').factory('SecondLanguage', function () {
  return {

    definedSecondLanguage: function (secondLanguage) {
      return angular.isUndefined(secondLanguage) ? '' : secondLanguage;
    },

    secondLanguageIsValid: function (secondLanguage) {
      return secondLanguage.length === 2;
    }

  }
})
