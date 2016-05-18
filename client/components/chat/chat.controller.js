'use strict';

angular.module('tcgtournamentApp')
  .controller('ChatController', function($scope, socket, ChatService, $mdSidenav) {

    ChatService.query(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('message', $scope.messages);
    });


    $scope.newMessage = {};

    $scope.sendMessage = function(keyEvent) {
      if (keyEvent.which === 13)
      {
        ChatService.save($scope.newMessage, function() {
          $scope.newMessage = {};
        });
      }
    };

    $scope.deleteMessage = function(message) {
      ChatService.remove({
        id: message._id
      }, function(message) {});
    };

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('message');
    });

    $scope.openChat = function() {
      $mdSidenav('right').toggle();
    };

    $scope.isOpen = function() {
      return $mdSidenav('right').isOpen();
    };

  })

.controller('RightCtrl', function($scope, $timeout, $mdSidenav, $log) {
  $scope.close = function() {
    $mdSidenav('right').close()
      .then(function() {
        $log.debug("close RIGHT is done");
      });
  };
});
