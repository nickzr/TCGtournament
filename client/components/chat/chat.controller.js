'use strict';

angular.module('tcgtournamentApp')
  .controller('ChatController', function($scope, $mdSidenav) {

    $scope.openChat = function() {
      $mdSidenav('right').toggle();
    };

    $scope.isOpen = function() {
      return $mdSidenav('right').isOpen();
    };

    $scope.sendMessage = function(keyEvent) {
      if (keyEvent.which === 13)
        $scope.chatMessage = null;
    };
  })
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close()
        .then(function () {
          $log.debug("close RIGHT is done");
        });
    };
  });
