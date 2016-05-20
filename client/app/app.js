'use strict';

angular.module('tcgtournamentApp', [
    'tcgtournamentApp.auth',
    'tcgtournamentApp.admin',
    'tcgtournamentApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'ngMaterial',
    'angularUtils.directives.dirPagination',
    'luegg.directives'
  ])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    var bg = $mdThemingProvider.extendPalette('grey', {
      'A100': '#F8F8F8'
    });

    $mdThemingProvider.definePalette('customBackground', bg);
    $mdThemingProvider.theme('default')
      .backgroundPalette('customBackground')

  });
