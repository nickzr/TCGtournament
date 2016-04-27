'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tournamentCtrlStub = {
  index: 'tournamentCtrl.index',
  show: 'tournamentCtrl.show',
  create: 'tournamentCtrl.create',
  update: 'tournamentCtrl.update',
  destroy: 'tournamentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tournamentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tournament.controller': tournamentCtrlStub
});

describe('Tournament API Router:', function() {

  it('should return an express router instance', function() {
    tournamentIndex.should.equal(routerStub);
  });

  describe('GET /api/tournaments', function() {

    it('should route to tournament.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tournamentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tournaments/:id', function() {

    it('should route to tournament.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tournamentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tournaments', function() {

    it('should route to tournament.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tournamentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tournaments/:id', function() {

    it('should route to tournament.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tournamentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tournaments/:id', function() {

    it('should route to tournament.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tournamentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tournaments/:id', function() {

    it('should route to tournament.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tournamentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
