'use strict'

angular.module('serinaApp').directive('listLangs', function ($location, DataAccessor, Toast, Dialog) {
  return {
    restrict: 'E',
    templateUrl: 'views/hub/list-langs.html',
    link: function (scope) {

      scope.getListLang = function () {
        DataAccessor.getListLang().then(function (response) {
          scope.listLangs = response.data.listLangs
        }, function (response) {
          console.error('Unable to retrieve language list', response)
        })
      }

      scope.addLang = function () {
        var langNotExist = true
        angular.forEach(scope.listLangs, function (lang) {
          if (lang === scope.addLang.code.toLowerCase()) {
            langNotExist = false
          }
        })

        if (langNotExist) {
          DataAccessor.addLang(scope.addLang.code).then(function () {
            Toast.showCustomToast('check', 'Langue "' + scope.addLang.code.toUpperCase() + '" ajouter avec succés !', 'good', 'HubCtrl')
            scope.addLang.code = ''
            scope.getListLang()
          }, function (response) {
            Toast.showCustomToast('warning', "Impossible d'ajouter la langue '" + scope.addLang.code.toUpperCase() + "'", 'fail', 'HubCtrl')
            console.error('Unable to add language "' + scope.addLang.code + '"', response)
          })
        } else {
          Toast.showCustomToast('info_outline', "La lange '" + scope.addLang.code.toUpperCase() + "' existe déjà !", 'medium', 'HubCtrl')
        }
      }

      scope.addLang.code = ''

      scope.deleteLang = function (lang, ev) {
        Dialog.showConfirm(ev).then(function () {
          DataAccessor.deleteLang(lang).then(function () {
            Toast.showCustomToast('check', 'Langue "' + lang.toUpperCase() + '" supprimé avec succés !', 'good', 'HubCtrl')
            scope.getListLang()
          }, function (response) {
            Toast.showCustomToast('warning', "Impossible de supprimer la langue '" + lang.toUpperCase() + "'", 'fail', 'HubCtrl')
            console.error('Unable to delete language "' + lang + '"', response)
          })
        })
      }

      scope.openLang = function (lang) {
        $location.path('/lang/' + lang.toLowerCase())
      }

      scope.getListLang()

    }
  }
})
