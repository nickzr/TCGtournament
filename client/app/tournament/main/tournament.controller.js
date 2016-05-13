'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentCtrl', function ($scope, socket, TournamentService, $state, Auth) {
    $scope.isAdmin = Auth.isAdmin;

    //Using the tournamentservice which connects to our backend using $resource, we get all tournaments and save them to our tournaments
    //Socket  syncupdate tells the system that we want to bind the 'tournaments' to the 'tournament' model type
    TournamentService.query(function(tournaments){
      $scope.tournaments = tournaments;
      socket.syncUpdates('tournament', $scope.tournaments)
    });

    $scope.tournament = {};

    $scope.createTournament = function(){
      TournamentService.save($scope.tournament, function(){
        $scope.tournament = {};
      });
    };

    $scope.deleteTournament = function(tournament){
      TournamentService.remove({id:tournament._id}, function(tournament){});
    };

    $scope.goToTournament = function(tournament){
      $state.go('tournamentdetails', {id: tournament._id});
    };

    // 
    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('tournament');
    });
  });
