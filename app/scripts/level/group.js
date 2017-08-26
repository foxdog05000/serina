'use strict'

angular.module('serinaApp').directive('group', function ($location, $routeParams, $i18next, DataAccessor, DataManager, Dialog, Toast) {
  return {
    restrict: 'E',
    templateUrl: 'views/level/group.html',
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
          if (!DataManager.find(scope.listGroups, groupName, 'group')) {
            DataAccessor.addGroup(scope.currentLanguage, $routeParams.levels, groupName).then(function () {
              scope.listGroups.push(groupName)
              Toast.showCustomToast('check', $i18next.t('commons.toast.addGroup.success', {'groupName': groupName}), 'good')
            }, function (response) {
              Toast.showCustomToast('warning', $i18next.t('commons.toast.addGroup.fail', {'groupName': groupName}), 'fail')
              console.error('Error on add new group', response)
            })
          } else {
            Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addGroup.groupExist', {'groupName': groupName}), 'medium')
          }
        })
      }

      scope.opendDialogUpdateGroupe = function (ev, groupName) {
        var originalGroupName = groupName
        var options = {
          title: $i18next.t('commons.dialog.majGroup.title'),
          placeholder: $i18next.t('commons.dialog.majGroup.placeholder'),
          ariaLabel: $i18next.t('commons.dialog.majGroup.title'),
          initialValue: groupName,
          targetEvent: ev,
          ok: $i18next.t('commons.actions.validate'),
          cancel: $i18next.t('commons.actions.cancel')
        }

        Dialog.showPrompt(options).then(function (groupName) {
          if (originalGroupName !== groupName) {
            DataAccessor.majGroup(scope.currentLanguage, $routeParams.levels, groupName, originalGroupName).then(function () {
              Toast.showCustomToast('check', $i18next.t('commons.toast.majGroup.success', {'groupName': groupName}), 'good')
              angular.forEach(scope.listGroups, function (value, index) {
                if (value === originalGroupName) {
                  scope.listGroups[index] = groupName
                }
              })
            }, function (response) {
              Toast.showCustomToast('warning', $i18next.t('commons.toast.majGroup.fail', {'groupName': groupName}), 'fail')
              console.error('Error on rename group', response)
            })
          }
        })
      }

      scope.openDialogDeleteGroup = function (ev, groupName) {
        Dialog.showConfirm(ev).then(function () {
          DataAccessor.deleteGroup(scope.currentLanguage, $routeParams.levels, groupName).then(function () {
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
