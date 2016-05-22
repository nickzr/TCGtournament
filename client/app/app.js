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
    'angularUtils.directives.dirPagination', //frontend pagination
    'luegg.directives' //scrollglue
  ])
  .config(function($urlRouterProvider, $locationProvider, $mdThemingProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);

    //overriting the A100 color to change the background color of angular material components
    var bg = $mdThemingProvider.extendPalette('grey', {
      'A100': '#F8F8F8'
    });

    $mdThemingProvider.definePalette('customBackground', bg);
    $mdThemingProvider.theme('default')
      .backgroundPalette('customBackground')

  });
