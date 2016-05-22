'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentCtrl', function($scope, socket, TournamentService, $state, $mdToast, Auth) {
    $scope.isAdmin = Auth.isAdmin;
    //pagination
    $scope.propToSortOn = 'title';
    $scope.reverse = false;
    $scope.search = {};
    $scope.totalTournaments = 0;
    $scope.tournamentsPerPage = 9;


    function getResultsPage(pageNumber) {
      TournamentService.paged({
          page: pageNumber,
          limit: $scope.tournamentsPerPage,
          sortBy: $scope.propToSortOn,
          search: $scope.search.value
        },
        function(tournaments) {
          $scope.totalTournaments = tournaments.total;
          $scope.tournaments = tournaments.docs;
          $scope.currentPage = pageNumber;
          socket.syncUpdates('tournament', $scope.tournaments);
        });
    }

    //search
    $scope.$watch('search', function() {
      getResultsPage(1);
    }, true);

    //sort
    $scope.sort = function(keyname) {

      $scope.propToSortOn = keyname;
      $scope.reverse = !$scope.reverse;
      if ($scope.reverse) {
        $scope.propToSortOn = '-' + $scope.propToSortOn;
      }
      getResultsPage($scope.currentPage);
    };

    $scope.pagination = {
      current: 1
    };

    $scope.pageChanged = function(newPage) {
      getResultsPage(newPage);
    };

    $scope.tournament = {};

    $scope.createTournament = function(form) {
      if (form.$valid) {
        TournamentService.save($scope.tournament, function() {
          $scope.tournament = {};
          var toast = $mdToast.simple()
            .textContent('Tournament created.')
            .action('OK')
            .highlightAction(false)
            .position('bottom right');
          $mdToast.show(toast);
          form.$setPristine(); //Clears the form
          form.$setUntouched(); //Sets the form to be untouched
        });
      }
    };

    $scope.deleteTournament = function(tournament) {
      TournamentService.remove({
        id: tournament._id
      }, function(tournament) {});
    };

    $scope.goToTournament = function(tournament) {
      $state.go('tournamentdetails', {
        id: tournament._id
      });
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('tournament');
    });

    getResultsPage(1);

  });
