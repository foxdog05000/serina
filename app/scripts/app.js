'use strict'

angular
  .module('serinaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMaterial'
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
  })
  .run(function ($rootScope, $mdSidenav) {
    $rootScope.endPoint = 'http://localhost:3000/api'
    $rootScope.toggleLeft = buildToggler('left')

    function buildToggler (componentId) {
      return function () {
        $mdSidenav(componentId).toggle()
      }
    }

    window.i18next.use(window.i18nextXHRBackend)

    window.i18next.init({
      debug: true,
      lng: 'fr', // If not given, i18n will detect the browser language.
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
