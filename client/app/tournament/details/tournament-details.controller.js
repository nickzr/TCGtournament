'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentDetailsCtrl', function ($scope, TournamentService, $stateParams) {

    $scope.newPlayer = {};

    TournamentService.get({id:$stateParams.id}, function(tournament){
      $scope.tournament = tournament;
    });

    /*$scope.addPlayer() = function(){};
    $scope.deletePlayer() = function(){};
    $scope.savePlayerEdit() = function(){};
    $scope.undoPlayerEdit() = function(){};
    $scope.editPlayer() = function(){};
    $scope.goToPlayer() = function(){};*/

    $scope.message = 'Hello';
  });
