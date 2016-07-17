'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newResult;

describe('Result API:', function () {

  describe('GET /api/results', function () {
    var results;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/results').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        results = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      results.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/results', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/results').send({
        name: 'New Result',
        info: 'This is the brand new result!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newResult = res.body;
        done();
      });
    });

    it('should respond with the newly created result', function () {
      newResult.name.should.equal('New Result');
      newResult.info.should.equal('This is the brand new result!!!');
    });
  });

  describe('GET /api/results/:id', function () {
    var result;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/results/' + newResult._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        result = res.body;
        done();
      });
    });

    afterEach(function () {
      result = {};
    });

    it('should respond with the requested result', function () {
      result.name.should.equal('New Result');
      result.info.should.equal('This is the brand new result!!!');
    });
  });

  describe('PUT /api/results/:id', function () {
    var updatedResult;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/results/' + newResult._id).send({
        name: 'Updated Result',
        info: 'This is the updated result!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedResult = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedResult = {};
    });

    it('should respond with the updated result', function () {
      updatedResult.name.should.equal('Updated Result');
      updatedResult.info.should.equal('This is the updated result!!!');
    });
  });

  describe('DELETE /api/results/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/results/' + newResult._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when result does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/results/' + newResult._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});

//# sourceMappingURL=result.integration-compiled.js.map