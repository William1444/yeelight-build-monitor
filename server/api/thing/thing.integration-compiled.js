'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = require('../..');


var newThing;

describe('Thing API:', function () {

  describe('GET /api/things', function () {
    var things;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/things').expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        things = res.body;
        done();
      });
    });

    it('should respond with JSON array', function () {
      things.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/things', function () {
    beforeEach(function (done) {
      (0, _supertest2.default)(app).post('/api/things').send({
        name: 'New Thing',
        info: 'This is the brand new thing!!!'
      }).expect(201).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        newThing = res.body;
        done();
      });
    });

    it('should respond with the newly created thing', function () {
      newThing.name.should.equal('New Thing');
      newThing.info.should.equal('This is the brand new thing!!!');
    });
  });

  describe('GET /api/things/:id', function () {
    var thing;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).get('/api/things/' + newThing._id).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        thing = res.body;
        done();
      });
    });

    afterEach(function () {
      thing = {};
    });

    it('should respond with the requested thing', function () {
      thing.name.should.equal('New Thing');
      thing.info.should.equal('This is the brand new thing!!!');
    });
  });

  describe('PUT /api/things/:id', function () {
    var updatedThing;

    beforeEach(function (done) {
      (0, _supertest2.default)(app).put('/api/things/' + newThing._id).send({
        name: 'Updated Thing',
        info: 'This is the updated thing!!!'
      }).expect(200).expect('Content-Type', /json/).end(function (err, res) {
        if (err) {
          return done(err);
        }
        updatedThing = res.body;
        done();
      });
    });

    afterEach(function () {
      updatedThing = {};
    });

    it('should respond with the updated thing', function () {
      updatedThing.name.should.equal('Updated Thing');
      updatedThing.info.should.equal('This is the updated thing!!!');
    });
  });

  describe('DELETE /api/things/:id', function () {

    it('should respond with 204 on successful removal', function (done) {
      (0, _supertest2.default)(app).delete('/api/things/' + newThing._id).expect(204).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });

    it('should respond with 404 when thing does not exist', function (done) {
      (0, _supertest2.default)(app).delete('/api/things/' + newThing._id).expect(404).end(function (err, res) {
        if (err) {
          return done(err);
        }
        done();
      });
    });
  });
});

//# sourceMappingURL=thing.integration-compiled.js.map