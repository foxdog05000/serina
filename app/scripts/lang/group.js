'use strict'

angular.module('serinaApp').directive('group', function (DataAccessor, Dialog, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/group.html',
    link: function (scope) {

      scope.openDialogAddGroup = function (ev) {
        var options = {
          title: 'Ajouter un nouveau groupe',
          placeholder: 'groupName',
          ariaLabel: 'Add new groupe',
          targetEvent: ev,
          ok: 'Ajouter',
          cancel: 'Annuler'
        }
        Dialog.showPrompt(options).then(function (groupName) {
          DataAccessor.addGroup(groupName).then(function () {
            scope.listGroups.push(groupName)
            Toast.showCustomToast('check', 'Groupe "' + groupName + '" ajouté avec succés !', 'good')
          }, function (response) {
            Toast.showCustomToast('warning', "Impossible d'ajouter le nouveau groupe !", 'fail')
            console.error('Error on add new group', response)
          })
        })
      }

    }
  }
})
