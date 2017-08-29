'use strict'

angular
  .module('serinaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial',
    'jm.i18next'
  ])
  .config(function ($routeProvider, $mdThemingProvider) {
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
  })
  .run(function ($rootScope, $mdSidenav) {
    $rootScope.loading = true
    $rootScope.endPoint = 'http://localhost:7777/api'
    $rootScope.toggleLeft = buildToggler('left')

    if (localStorage.getItem('serinaSettings') === null) {
      $rootScope.settings = {
        locale: 'en',
        theme: 'green',
        selectedDisplayFormat: 'card'
      }
      localStorage.setItem('serinaSettings', JSON.stringify($rootScope.settings))
    } else {
      $rootScope.settings = JSON.parse(localStorage.getItem('serinaSettings'))
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
