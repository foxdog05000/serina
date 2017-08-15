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
      .when('/lang/:lang', {
        templateUrl: 'views/lang/lang.html',
        controller: 'LangCtrl'
      })
      .when('/lang/:lang/:group*', {
        templateUrl: 'views/lang/lang.html',
        controller: 'LangCtrl'
      })
      .otherwise({
        redirectTo: '/hub'
      })

    window.i18next.use(window.i18nextXHRBackend)

    window.i18next.init({
      debug: true,
      lng: 'en', // If not given, i18n will detect the browser language.
      fallbackLng: '', // Default is dev
      backend: {
        loadPath: '../app/locales/{{lng}}/{{ns}}.json'
      },
      useCookie: false,
      useLocalStorage: false
    }, function (err, t) {
      err ? console.error('error load translation', err) : null
      console.log('resources loaded')
    })

    var customGreen = $mdThemingProvider.extendPalette('green', {
      'contrastDefaultColor': 'light'
    })

    $mdThemingProvider.definePalette('custom-green', customGreen)

    $mdThemingProvider.theme('default')
      .primaryPalette('custom-green')
      .accentPalette('orange')
      .warnPalette('red')
  })
  .run(function ($rootScope, $mdSidenav) {
    $rootScope.loading = true
    $rootScope.endPoint = 'http://localhost:3000/api'
    $rootScope.toggleLeft = buildToggler('left')

    setTimeout(function () {
      $rootScope.$apply(function () {
        $rootScope.loading = false
      })
    }, 750)

    function buildToggler (componentId) {
      return function () {
        $mdSidenav(componentId).toggle()
      }
    }
  })
