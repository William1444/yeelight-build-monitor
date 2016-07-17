'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newConnect;

describe('Connect API:', function () {

  describe('GET /api/connects', function () {
    var connects;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/connects').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        connects = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      connects.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/connects', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/connects').send({
        name: 'New Connect',
        info: 'This is the brand new connect!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newConnect = res.body;
        done();
      });
    });

    it('should respond with the newly created connect', function () {
      newConnect.name.should.equal('New Connect');
      newConnect.info.should.equal('This is the brand new connect!!!');
    });
  });

  describe('GET /api/connects/:id', function () {
    var connect;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/connects/' + newConnect._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        connect = res.body;
        done();
      });
    });

    afterEach(function () {
      connect = {};
    });

    it('should respond with the requested connect', function () {
      connect.name.should.equal('New Connect');
      connect.info.should.equal('This is the brand new connect!!!');
    });
  });

  describe('PUT /api/connects/:id', function () {
    var updatedConnect;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/connects/' + newConnect._id).send({
        name: 'Updated Connect',
        info: 'This is the updated connect!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedConnect = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedConnect = {};
    });

    it('should respond with the updated connect', function () {
      updatedConnect.name.should.equal('Updated Connect');
      updatedConnect.info.should.equal('This is the updated connect!!!');
    });
  });

  describe('DELETE /api/connects/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/connects/' + newConnect._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when connect does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/connects/' + newConnect._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});

//# sourceMappingURL=connect.integration-compiled.js.map