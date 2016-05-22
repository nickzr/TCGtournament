'use strict';

angular.module('tcgtournamentApp')
  .factory('TournamentService', function($resource) {
    return $resource('/api/tournaments/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      },
      paged: {
        method: 'GET'
      }
    });
  });
