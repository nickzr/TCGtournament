'use strict';

angular.module('tcgtournamentApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('tournament', {
        url: '/',
        templateUrl: 'app/tournament/main/tournament.html',
        controller: 'TournamentCtrl',
        resolve: {
          tournaments: function(TournamentService) {
            return TournamentService.paged({
              page: 1,
              limit: 5,
              sortBy: 'title'
            });
          }
        }
      })
      .state('tournamentdetails', {
        url: '/tournament/:id',
        templateUrl: 'app/tournament/details/tournament-details.html',
        controller: 'TournamentDetailsCtrl'
      });
  });
