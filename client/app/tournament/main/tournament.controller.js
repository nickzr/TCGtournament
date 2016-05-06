'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentCtrl', function ($scope, socket, TournamentService, $state, Auth) {
    $scope.isAdmin = Auth.isAdmin;
    
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

    $scope.message = 'Hello';

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('tournament');
    });
  });
