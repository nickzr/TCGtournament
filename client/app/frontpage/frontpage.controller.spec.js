'use strict';

describe('Controller: FrontpageCtrl', function () {

  // load the controller's module
  beforeEach(module('tcgtournamentApp'));

  var FrontpageCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FrontpageCtrl = $controller('FrontpageCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
