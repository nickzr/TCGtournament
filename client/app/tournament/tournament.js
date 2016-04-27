'use strict';

angular.module('tcgtournamentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tournament', {
        url: '/tournament',
        templateUrl: 'app/tournament/tournament.html',
        controller: 'TournamentCtrl'
      });
  });
