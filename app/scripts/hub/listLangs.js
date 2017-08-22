'use strict'

angular.module('serinaApp').directive('listLangs', function ($i18next, $location, DataAccessor, Toast, Dialog) {
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
            Toast.showCustomToast('check', $i18next.t('commons.toast.addLang.success', {lang: scope.addLang.code.toUpperCase()}), 'good', 'HubCtrl')
            scope.addLang.code = ''
            scope.getListLang()
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.addLang.fail', {lang: scope.addLang.code.toUpperCase()}), 'fail', 'HubCtrl')
            console.error('Unable to add language "' + scope.addLang.code + '"', response)
          })
        } else {
          Toast.showCustomToast('info_outline', $i18next.t('commons.toast.addLang.langExist', {lang: scope.addLang.code.toUpperCase()}), 'medium', 'HubCtrl')
        }
      }

      scope.addLang.code = ''

      scope.deleteLang = function (lang, ev) {
        Dialog.showConfirm(ev).then(function () {
          DataAccessor.deleteLang(lang).then(function () {
            Toast.showCustomToast('check', $i18next.t('commons.toast.deleteLang.success', {lang: scope.addLang.code.toUpperCase()}), 'good', 'HubCtrl')
            scope.getListLang()
          }, function (response) {
            Toast.showCustomToast('warning', $i18next.t('commons.toast.deleteLang.fail', {lang: scope.addLang.code.toUpperCase()}), 'fail', 'HubCtrl')
            console.error('Unable to delete language "' + lang + '"', response)
          })
        })
      }

      scope.openLang = function (lang) {
        $location.path('/lang/' + lang.toLowerCase())
      }

      scope.downloadLang = function (lang) {
        DataAccessor.downloadLang(lang).then(function (response) {
          var anchor = angular.element('<a/>')
          anchor.attr({
            href: 'data:attachment/json;charset=utf-8,' + encodeURI(JSON.stringify(response.data)),
            target: '_blank',
            download: 'translation.json'
          })[0].click()
        })
      }

      scope.getListLang()

    }
  }
})
