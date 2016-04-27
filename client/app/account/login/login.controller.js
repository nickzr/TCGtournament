'use strict';

angular.module('tcgtournamentApp')
  .controller('LoginController', function($scope, $state, Auth){
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.Auth = Auth;

    $scope.login = function(form){
      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.login({
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(() => {
          // Logged in, redirect to home
          $state.go('main');
        })
        .catch(err => {
          $scope.errors.other = err.message;
        });
    }
  }
});
