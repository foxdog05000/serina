'use strict'

angular
  .module('serinaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'jm.i18next',
    'jsonFormatter'
  ])
  .config(function ($routeProvider, $mdThemingProvider, JSONFormatterConfigProvider) {
    $routeProvider
      .when('/hub', {
        templateUrl: 'views/hub/hub.html',
        controller: 'HubCtrl'
      })
      .when('/language/:language', {
        templateUrl: 'views/level/level.html',
        controller: 'LevelCtrl'
      })
      .when('/language/:language/:levels*', {
        templateUrl: 'views/level/level.html',
        controller: 'LevelCtrl'
      })
      .when('/preview', {
        templateUrl: 'views/preview/preview.html',
        controller: 'PreviewCtrl'
      })
      .when('/settings', {
        templateUrl: 'views/settings/settings.html',
        controller: 'SettingsCtrl'
      })
      .otherwise({
        redirectTo: '/hub'
      })

    var customGreen = $mdThemingProvider.extendPalette('green', {
      'contrastDefaultColor': 'light'
    })

    $mdThemingProvider.definePalette('custom-green', customGreen)

    $mdThemingProvider.theme('indigo')
      .primaryPalette('indigo')
      .accentPalette('orange')
      .warnPalette('red')

    $mdThemingProvider.theme('orange')
      .primaryPalette('orange')
      .accentPalette('orange')
      .warnPalette('red')

    $mdThemingProvider.theme('purple')
      .primaryPalette('purple')
      .accentPalette('orange')
      .warnPalette('red')

    $mdThemingProvider.theme('brown')
      .primaryPalette('brown')
      .accentPalette('orange')
      .warnPalette('red')

    $mdThemingProvider.theme('grey')
      .primaryPalette('grey')
      .accentPalette('orange')
      .warnPalette('red')

    $mdThemingProvider.theme('green')
      .primaryPalette('custom-green')
      .accentPalette('orange')
      .warnPalette('red')

    $mdThemingProvider.alwaysWatchTheme(true)

    JSONFormatterConfigProvider.hoverPreviewEnabled = true
    JSONFormatterConfigProvider.hoverPreviewArrayCount = 100
    JSONFormatterConfigProvider.hoverPreviewFieldCount = 5
  })
  .run(function ($rootScope, $mdSidenav, LocalStorage) {
    $rootScope.loading = true
    $rootScope.endPoint = 'http://localhost:7777/api'
    $rootScope.toggleLeft = buildToggler('left')
    $rootScope.keySettingsApp = 'serinaSettings'

    if (LocalStorage.itemExist($rootScope.keySettingsApp)) {
      $rootScope.settings = LocalStorage.getItem($rootScope.keySettingsApp)
    } else {
      $rootScope.settings = {
        locale: 'en',
        theme: 'green',
        selectedDisplayFormat: 'card'
      }
      LocalStorage.setItem($rootScope.keySettingsApp, $rootScope.settings)
    }

    window.i18next.use(window.i18nextXHRBackend)

    window.i18next.init({
      debug: false,
      lng: $rootScope.settings.locale, // If not given, i18n will detect the browser language.
      fallbackLng: '', // Default is dev
      backend: {
        loadPath: '../app/locales/{{lng}}/translation.json'
      },
      useCookie: false,
      useLocalStorage: false
    }, function (err, t) {
      err ? console.error('error load translation', err) : null
      console.log('Translation loaded')
    })

    setTimeout(function () {
      $rootScope.$apply(function () {
        $rootScope.loading = false
      })
    }, 1000)

    function buildToggler (componentId) {
      return function () {
        $mdSidenav(componentId).toggle()
      }
    }
  })
