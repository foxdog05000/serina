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
  .config(function ($routeProvider) {
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
        loadPath: '../locales/{{lng}}/{{ns}}.json'
      },
      useCookie: false,
      useLocalStorage: false
    }, function (err, t) {
      console.log('resources loaded')
    })
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
