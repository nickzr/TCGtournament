'use strict';

angular.module('tcgtournamentApp')
  .controller('TournamentCtrl', function($scope, socket, TournamentService, $state, Auth, tournaments) {
    $scope.isAdmin = Auth.isAdmin;
    //pagination
    $scope.propToSortOn = 'title';
    $scope.reverse = false;
    $scope.search = {};
    $scope.totalTournaments = 0;
    $scope.tournamentsPerPage = 5;

    function initialize(tournaments) {
      $scope.totalTournaments = tournaments.total;
      $scope.tournaments = tournaments.docs;
      $scope.currentPage = 1;
    }

    function getResultsPage(pageNumber) {
      if (!$scope.tournaments) {
        return;
      }
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
      console.log(newPage)
    };

    $scope.tournament = {};

    $scope.createTournament = function() {
      TournamentService.save($scope.tournament, function() {
        $scope.tournament = {};
      });
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
      //socket.unsyncUpdates('tournament');
    });

    initialize(tournaments);

  });
