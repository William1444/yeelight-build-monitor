'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var connectCtrlStub = {
  index: 'connectCtrl.index',
  show: 'connectCtrl.show',
  create: 'connectCtrl.create',
  update: 'connectCtrl.update',
  destroy: 'connectCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var connectIndex = proxyquire('./index.js', {
  'express': {
    Router: function Router() {
      return routerStub;
    }
  },
  './connect.controller': connectCtrlStub
});

describe('Connect API Router:', function () {

  it('should return an express router instance', function () {
    connectIndex.should.equal(routerStub);
  });

  describe('GET /api/connects', function () {

    it('should route to connect.controller.index', function () {
      routerStub.get.withArgs('/', 'connectCtrl.index').should.have.been.calledOnce;
    });
  });

  describe('GET /api/connects/:id', function () {

    it('should route to connect.controller.show', function () {
      routerStub.get.withArgs('/:id', 'connectCtrl.show').should.have.been.calledOnce;
    });
  });

  describe('POST /api/connects', function () {

    it('should route to connect.controller.create', function () {
      routerStub.post.withArgs('/', 'connectCtrl.create').should.have.been.calledOnce;
    });
  });

  describe('PUT /api/connects/:id', function () {

    it('should route to connect.controller.update', function () {
      routerStub.put.withArgs('/:id', 'connectCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/connects/:id', function () {

    it('should route to connect.controller.update', function () {
      routerStub.patch.withArgs('/:id', 'connectCtrl.update').should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/connects/:id', function () {

    it('should route to connect.controller.destroy', function () {
      routerStub.delete.withArgs('/:id', 'connectCtrl.destroy').should.have.been.calledOnce;
    });
  });
});

//# sourceMappingURL=index.spec-compiled.js.map