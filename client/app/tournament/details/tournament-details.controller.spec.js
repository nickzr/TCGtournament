'use strict';

describe('Component: DetailsComponent', function() {

  // load the controller's module
  beforeEach(module('tcgtournamentApp'));

  var DetailsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController, $rootScope) {
    scope = $rootScope.$new();
    DetailsComponent = $componentController('DetailsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function() {
    expect(1).toEqual(1);
  });
});
