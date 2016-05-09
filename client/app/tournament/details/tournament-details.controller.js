'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentDetailsCtrl', function (Auth, $scope, TournamentService, $stateParams, $mdToast, $mdDialog) {
    $scope.isAdmin = Auth.isAdmin;
    $scope.newPlayer = {};
    $scope.tournament = {};

    TournamentService.get({id:$stateParams.id}
      , function(tournament){
      $scope.tournament = tournament;
    });

    $scope.goBack = function(){
      window.history.back();
    };

    $scope.addPlayer = function(form){
      if(form.$valid){
        $scope.newPlayer.enabled = true;
        $scope.tournament.players.push($scope.newPlayer);

        TournamentService.update({id: $scope.tournament._id}
          , $scope.tournament
          , function(tournament){
          $scope.tournament = tournament;
          var toast = $mdToast.simple()
            .textContent('Participant has been signed up.')
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

    $scope.editPlayer = function(player){
      $scope.editingPlayer = angular.copy(player); //creates a deep copy of the player object
    };

    $scope.undoPlayerEdit = function(){
      $scope.editingPlayer = undefined;
    };

    $scope.deletePlayer = function(player, event){
      var confirm = $mdDialog.confirm()
      .title('Remove participant?')
      .textContent('Are you sure that you want to remove the person from participants?')
      .ariaLabel('Delete')
      .targetEvent(event)
      .openFrom('#right')
      .ok('Remove')
      .cancel('Cancel');
      $mdDialog.show(confirm).then(function(){
        _.remove($scope.tournament.players, function(player){
          return player._id === $scope.editingPlayer._id; //strictly equals
        });

        TournamentService.update({id : $scope.tournament._id}
          , $scope.tournament
          , function(tournament){
          $scope.tournament = tournament;
          var toast = $mdToast.simple()
          .textContent('Remove participant')
          .action('OK')
          .highlightAction(false)
          .position('bottom right');
          $mdToast.show(toast);
          $scope.editingPlayer = undefined;
        });
      });
    };

    $scope.savePlayerEdit = function(form){
      if (form.$valid) {
        var playerFound = _.find($scope.tournament.players
          , function(player) {
          return player._id === $scope.editingPlayer._id;
        });

        playerFound.firstName = $scope.editingPlayer.firstName;
        playerFound.lastName = $scope.editingPlayer.lastName;
        playerFound.DCI = $scope.editingPlayer.DCI;
        playerFound.email = $scope.editingPlayer.email;

        TournamentService.update({id: $scope.tournament._id}
          , $scope.tournament
          , function(tournament) {
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
