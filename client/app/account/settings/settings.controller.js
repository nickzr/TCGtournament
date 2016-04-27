'use strict';

angular.module('tcgtournamentApp')
  .controller('SettingsController', function($scope, Auth){
    $scope.errors = {};
    $scope.submitted = false;

    $scope.Auth = Auth;

    $scope.changePassword = function(form){
      $scope.submitted = true;

      if (form.$valid) {
        $scope.Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
          .then(() => {
            $scope.message = 'Password successfully changed.';
          })
          .catch(() => {
            form.password.$setValidity('mongoose', false);
            $scope.errors.other = 'Incorrect password';
            $scope.message = '';
          });
    }
  }
});

/*class SettingsController {
  constructor(Auth) {
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }
  }
}

angular.module('tcgtournamentApp')
  .controller('SettingsController', SettingsController);*/
