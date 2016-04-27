'use strict';

angular.module('tcgtournamentApp')
  .controller('SignupController', function($scope, Auth, $state){
    $scope.user = {};
    $scope.errors = {};
    $scope.submitted = false;

    $scope.Auth = Auth;

    $scope.register = function(form){
      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.createUser({
          name: $scope.user.name,
          email: $scope.user.email,
          password: $scope.user.password
        })
        .then(() => {
          // Account created, redirect to home
          $state.go('main');
        })
        .catch(err => {
          err = err.data;
          $scope.errors = {};

          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            $scope.errors[field] = error.message;
          });
        });
      }
    }
  });

/*class SignupController {
  //start-non-standard
  user = {};
  errors = {};
  submitted = false;
  //end-non-standard

  constructor(Auth, $state) {
    this.Auth = Auth;
    this.$state = $state;
  }

  register(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Account created, redirect to home
        this.$state.go('main');
      })
      .catch(err => {
        err = err.data;
        this.errors = {};

        // Update validity of form fields that match the mongoose errors
        angular.forEach(err.errors, (error, field) => {
          form[field].$setValidity('mongoose', false);
          this.errors[field] = error.message;
        });
      });
    }
  }
}

angular.module('tcgtournamentApp')
  .controller('SignupController', SignupController);*/
