'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Tournaments',
    'state': 'tournament'
  }];

  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('tcgtournamentApp')
  .controller('NavbarController', NavbarController);
