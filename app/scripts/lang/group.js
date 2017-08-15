'use strict'

angular.module('serinaApp').directive('group', function ($location, $routeParams, $i18next, DataAccessor, DataManager, Dialog, Toast) {
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
          DataAccessor.addGroup(scope.currentLang, $routeParams.group, groupName).then(function () {
            scope.listGroups.push(groupName)
            Toast.showCustomToast('check', $i18next.t('commons.toast.addGroup.success', {'groupName': groupName}), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.addGroup.fail', {'groupName': groupName}), 'fail')
            console.error('Error on add new group', response)
          })
        })
      }

      scope.openDialogDeleteGroup = function (ev, groupName) {
        Dialog.showConfirm(ev).then(function () {
          DataAccessor.deleteGroup(scope.currentLang, $routeParams.group, groupName).then(function () {
            scope.listGroups = DataManager.remove(scope.listGroups, groupName)
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteGroup.success', {'groupName': groupName}), 'good')
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteGroup.fail', {'groupName': groupName}), 'fail')
            console.error('Error on delete group', response)
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
