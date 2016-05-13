'use strict';

angular.module('tcgtournamentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('frontpage', {
        url: '/frontpage',
        templateUrl: 'app/frontpage/frontpage.html',
        controller: 'FrontpageCtrl'
      });
  });
