'use strict'

angular.module('serinaApp').factory('Dialog', function ($mdDialog, $i18next) {
  return {

    showConfirm: function (ev) {
      var dialog = $mdDialog.confirm()
        .title($i18next.t('commons.dialog.confirmTitle'))
        .ariaLabel($i18next.t('commons.dialog.confirmTitle'))
        .targetEvent(ev)
        .ok($i18next.t('commons.actions.validate'))
        .cancel($i18next.t('commons.actions.cancel'))

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
