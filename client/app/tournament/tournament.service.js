'use strict';

angular.module('tcgtournamentApp')
  .factory('TournamentService', function($resource) {
      return $resource('/api/tournament/:id', {
        id: '@id'
      }, {
        update: {
          method: 'PUT'
        }
      });
  });
