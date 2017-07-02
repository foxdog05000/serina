'use strict'

angular.module('serinaApp').directive('group', function ($location, $i18next, DataAccessor, Dialog, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/group.html',
    link: function (scope) {

      scope.openDialogAddGroup = function (ev) {
        var options = {
          title: $i18next.t('commons.dialog.addGroup.title'),
          placeholder: $i18next.t('commons.dialog.addGroup.placeholder'),
          ariaLabel: $i18next.t('commons.dialog.addGroup.title'),
          targetEvent: ev,
          ok: $i18next.t('commons.actions.add'),
          cancel: $i18next.t('commons.actions.cancel')
        }

        Dialog.showPrompt(options).then(function (groupName) {
          DataAccessor.addGroup(scope.currentLang, groupName).then(function () {
            scope.listGroups.push(groupName)
            Toast.showCustomToast('check', 'Groupe "' + groupName + '" ajouté avec succés !', 'good')
          }, function (response) {
            Toast.showCustomToast('warning', "Impossible d'ajouter le nouveau groupe !", 'fail')
            console.error('Error on add new group', response)
          })
        })
      }

      scope.openGroup = function (group) {
        var currentUrl = $location.path()
        $location.path(currentUrl + '/' + group)
      }

    }
  }
})
