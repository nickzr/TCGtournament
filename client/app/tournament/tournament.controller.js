'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentCtrl', function ($scope, socket, TournamentService) {

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

    $scope.message = 'Hello';

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('tournament');
    });
  });
