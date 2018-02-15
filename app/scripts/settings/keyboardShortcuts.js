'use strict'

angular.module('serinaApp').component('keyboardShortcuts', {
  controller: function KeyboardShortcutsCtrl () {

    this.shortcuts = [
      { descriptionKey: 'toggleSearchBar', key: 'F' },
      { descriptionKey: 'navigateToPreviousCorrespondingItem', icon: 'arrow_upward' },
      { descriptionKey: 'navigateToNextCorrespondingItem', icon: 'arrow_downward' }
    ]

  },
  templateUrl: 'views/settings/keyboard-shortcuts.html'
})
