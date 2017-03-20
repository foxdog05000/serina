'use strict';

/**
 * @ngdoc overview
 * @name serinaApp
 * @description
 * # serinaApp
 *
 * Main module of the application.
 */
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
      .otherwise({
        redirectTo: '/hub'
      });
  })
  .run(function ($rootScope, $mdSidenav) {
    $rootScope.toggleLeft = buildToggler('left');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
  });
