'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentDetailsCtrl', function(Auth, $scope, TournamentService, $stateParams, $mdToast, $mdDialog) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.newPlayer = {};
    $scope.tournament = {};

    //Using the tournament service, we load the tournament with the specific ID and save it to the scope
    TournamentService.get({
      id: $stateParams.id
    }, function(tournament) {
      $scope.tournament = tournament;
    });

    $scope.goBack = function() {
      window.history.back();
    };

    //Save the player to the list of players in the tournament,
    //Then do an update on the tournament service, it then does a call back and we save the new tournament to our tournament
    $scope.addPlayer = function(form) {
      if (form.$valid) {
        $scope.newPlayer.enabled = true;
        $scope.tournament.players.push($scope.newPlayer);

        TournamentService.update({
          id: $scope.tournament._id
        }, $scope.tournament, function(tournament) {
          $scope.tournament = tournament;
          var toast = $mdToast.simple()
            .textContent('Signed up')
            .action('OK')
            .highlightAction(false)
            .position('bottom right');
          $mdToast.show(toast);
          form.$setPristine(); //Clears the form
          form.$setUntouched(); //Sets the form to be untouched
          $scope.newPlayer = {};
        });
      }
    };

    $scope.editPlayer = function(player) {
      $scope.editingPlayer = angular.copy(player); //creates a deep copy of the player object
    };

    $scope.undoPlayerEdit = function() {
      $scope.editingPlayer = undefined; //sets editingPlayer back to undefined to close edit content
    };

    //Using the lodash directive remove, we remove the first player it finds with the given id in the list of players
    //Then do an update on the tournament service
    $scope.deletePlayer = function(player, event) {
      var confirm = $mdDialog.confirm()
        .title('Remove participant?')
        .textContent('Are you sure that you want to remove this person?')
        .ariaLabel('Delete')
        .targetEvent(event)
        .openFrom('#right')
        .ok('Remove')
        .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        _.remove($scope.tournament.players, function(player) {
          return player._id === $scope.editingPlayer._id; //strictly equals
        });

        TournamentService.update({
          id: $scope.tournament._id
        }, $scope.tournament, function(tournament) {
          $scope.tournament = tournament;
          var toast = $mdToast.simple()
            .textContent('Participant removed')
            .action('OK')
            .highlightAction(false)
            .position('bottom right');
          $mdToast.show(toast);
          $scope.editingPlayer = undefined;
        });
      });
    };

    //Using the lodash directive find, we will find the player with the right id and use it to update its information
    //Then do an update on the tournament service
    $scope.savePlayerEdit = function(form) {
      if (form.$valid) {
        var playerFound = _.find($scope.tournament.players, function(player) {
          return player._id === $scope.editingPlayer._id;
        });

        playerFound.firstName = $scope.editingPlayer.firstName;
        playerFound.lastName = $scope.editingPlayer.lastName;
        playerFound.DCI = $scope.editingPlayer.DCI;
        playerFound.email = $scope.editingPlayer.email;

        TournamentService.update({
          id: $scope.tournament._id
        }, $scope.tournament, function(tournament) {
          $scope.tournament = tournament;
          form.$setPristine();
          form.$setUntouched();
          var toast = $mdToast.simple()
            .textContent('Save edit.')
            .action('OK')
            .highlightAction(false)
            .position('top');
          $mdToast.show(toast);
        });
        $scope.editingPlayer = undefined;
      }
    };
  });
