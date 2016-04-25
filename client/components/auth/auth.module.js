'use strict';

angular.module('tcgtournamentApp.auth', [
  'tcgtournamentApp.constants',
  'tcgtournamentApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
