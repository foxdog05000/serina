'use strict'

angular.module('serinaApp').directive('level', function ($routeParams, DataAccessor, Toast, Dialog) {
  return {
    restrict: 'E',
    templateUrl: 'views/lang/level.html',
    link: function (scope) {

      var getListGroupsAndTrad = function (langJson) {
        scope.listGroups = []
        scope.listTrad = []
        angular.forEach(langJson, function (trad, key) {
          if (angular.isObject(trad)) {
            scope.listGroups.push(key)
          } else {
            scope.listTrad.push({key, trad})
          }
        })
      }

      scope.addNewTrad = function () {
        scope.listTrad.push({key: '', trad: ''})
      }

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

      DataAccessor.openLang($routeParams.lang.toLowerCase()).then(function (response) {
        getListGroupsAndTrad(response.data)
      }, function (response) {
        console.error('Error', response)
      })

    }
  }
})
