'use strict'

angular.module('serinaApp').directive('listLanguagesForPreview', function ($log, $timeout, DataAccessor, Upload) {
  return {
    restrict: 'E',
    templateUrl: 'views/preview/list-languages-for-preview.html',
    link: function (scope) {

      var recoverListLanguagesForPreview = function () {
        DataAccessor.getListLanguages().then(function (response) {
          scope.listLanguages = response.data
        }, function (response) {
          console.error('Unable to retrieve languages list', response)
        })
      }

      scope.previewLanguage = function (languageCode) {
        scope.selectedLanguage = languageCode
        DataAccessor.openLanguage(languageCode).then(function (response) {
          scope.previewJson = response.data
        }, function (response) {
          $log.error('Unable to preview language ' + languageCode, response)
        })
      }

      scope.log = '';

      scope.upload = function (files) {
        if (files && files.length) {
          for (var i = 0; i < files.length; i++) {
            var file = files[i];
            if (!file.$error) {
              Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                  file: file
                }
              }).then(function (resp) {
                $timeout(function() {
                  scope.log = 'file: ' +
                  resp.config.data.file.name +
                  ', Response: ' + JSON.stringify(resp.data) +
                  '\n' + $scope.log;
                });
              }, null, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                scope.log = 'progress: ' + progressPercentage + '% ' + evt.config.data.file.name + '\n' + scope.log;
              });
            }
          }
        }
      }

      recoverListLanguagesForPreview()

      scope.$watch('files', function () {
        scope.upload(scope.files)
      })

    }
  }
})
