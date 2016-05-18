'use strict';

angular.module('tcgtournamentApp')
.directive('chat', () => ({
  templateUrl: 'components/chat/chat.html',
  restrict: 'E',
  controller: 'ChatController'
}));
