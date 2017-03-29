'use strict'

angular.module('serinaApp').factory('Dialog', function ($mdDialog) {
  return {

    showConfirm: function (ev) {
      var dialog = $mdDialog.confirm()
        .title('Êtes-vous sûr ?')
        .ariaLabel('Are you sure ?')
        .targetEvent(ev)
        .ok('Valider')
        .cancel('Annuler')

      return $mdDialog.show(dialog)
    },

    showPrompt: function (options) {
      var dialog = $mdDialog.prompt()
        .title(options.title)
        .textContent(options.textContent)
        .placeholder(options.placeholder)
        .ariaLabel(options.ariaLabel)
        .initialValue(options.initialValue)
        .targetEvent(options.ev)
        .ok(options.ok)
        .cancel(options.cancel)

      return $mdDialog.show(dialog)
    }

  }
})
