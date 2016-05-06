'use strict';

angular.module('tcgtournamentApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tournament', {
        url: '/',
        templateUrl: 'app/tournament/main/tournament.html',
        controller: 'TournamentCtrl'
      })
      .state('tournamentdetails', {
        url: '/tournament/:id',
        templateUrl: 'app/tournament/details/tournament-details.html',
        controller: 'TournamentDetailsCtrl'
      });
  });
