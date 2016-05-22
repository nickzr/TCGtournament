'use strict';

angular.module('tcgtournamentApp')
  .factory('ChatService', function($resource) {
    return $resource('/api/messages/:id', {
      id: '@id'
    });
  });
